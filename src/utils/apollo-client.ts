import { useMemo } from "react";
import {
    ApolloClient,
    concat,
    FetchResult,
    from,
    GraphQLRequest,
    HttpLink,
    InMemoryCache,
    type NormalizedCacheObject,
    split,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition, Observable } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { addMinutes } from "date-fns";
import { GraphQLError } from "graphql";
import { onError } from "@apollo/client/link/error";

import { API_URL } from "@constants/config";
import { REFRESH_TOKEN_MUTATION_SCHEMA } from "@datastore/server/schema/AuthenticationSchema";
import { usePersistedAuthenticationStore } from "@datastore/local/store/AuthenticationStore";
import { isEmpty } from "./validation";
import { lowerCase } from "./string";

export let apolloClient: ApolloClient<NormalizedCacheObject> | null;

export const APOLLO_PROPS = "__APOLLO_PROPS__";

const isRefreshRequest = (operation: GraphQLRequest) => {
    return operation.operationName === "Refresh";
};

const getRefreshedAccessTokenPromise = async () => {
    const getCredentials = localStorage.getItem("credentials");
    const credentials = JSON.parse(getCredentials).state.credentials;

    try {
        const refreshResolverResponse = await apolloClient.mutate({
            variables: {
                payload: {
                    refresh_token: credentials.refresh_token,
                    regenerate: true,
                },
            },
            mutation: REFRESH_TOKEN_MUTATION_SCHEMA,
        });

        const { token, lifetime, refresh_token } =
            refreshResolverResponse.data.refresh.data;
        usePersistedAuthenticationStore.setState({
            credentials: {
                token,
                lifetime,
                refresh_token,
                expired_at: addMinutes(new Date(), 50),
            },
        });

        return refreshResolverResponse.data.refresh.data.token;
    } catch (err) {
        usePersistedAuthenticationStore.getState().userLogout();
        return err;
    }
};

const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
            for (let err of graphQLErrors) {
                switch (err.extensions.code) {
                    case "UNAUTHENTICATED":
                    case "TOKEN_EXPIRED": {
                        if (operation.operationName === "Refresh") return;

                        const observable = new Observable<
                            FetchResult<Record<string, any>>
                        >((observer) => {
                            (async () => {
                                try {
                                    const accessToken =
                                        await getRefreshedAccessTokenPromise();

                                    if (!accessToken) {
                                        throw new GraphQLError(
                                            "Empty AccessToken",
                                        );
                                    }

                                    const subscriber = {
                                        next: observer.next.bind(observer),
                                        error: observer.error.bind(observer),
                                        complete:
                                            observer.complete.bind(observer),
                                    };

                                    forward(operation).subscribe(subscriber);
                                } catch (err) {
                                    observer.error(err);
                                }
                            })();
                        });

                        return observable;
                    }
                }
            }
        }
        if (networkError) console.log(`[Network error]: ${networkError}`);
    },
);

export const authLink = setContext((operation, { headers }) => {
    const getCredentials = localStorage.getItem("credentials");
    let credentials = JSON.parse(getCredentials).state.credentials;

    return {
        headers: {
            ...headers,
            ...(!isRefreshRequest(operation) &&
                !isEmpty(credentials) && {
                    Authorization: `Bearer ${credentials.token}`,
                }),
        },
    };
});

const parseHeaders = (rawHeaders: any) => {
    const headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
    preProcessedHeaders.split(/\r?\n/).forEach((line: any) => {
        const parts = line.split(":");
        const key = parts.shift().trim();
        if (key) {
            const value = parts.join(":").trim();
            headers.append(key, value);
        }
    });
    return headers;
};

export const uploadFetch = (url: string, options: any) =>
    new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            const opts: any = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || ""),
            };
            opts.url =
                "responseURL" in xhr
                    ? xhr.responseURL
                    : opts.headers.get("X-Request-URL");
            const body =
                "response" in xhr ? xhr.response : (xhr as any).responseText;
            resolve(new Response(body, opts));
        };
        xhr.onerror = () => {
            reject(new TypeError("Network request failed"));
        };
        xhr.ontimeout = () => {
            reject(new TypeError("Network request failed"));
        };
        xhr.open(options.method, url, true);

        Object.keys(options.headers).forEach((key) => {
            xhr.setRequestHeader(key, options.headers[key]);
        });

        if (xhr.upload) {
            xhr.upload.onprogress = options.onProgress;
        }

        options.onAbortPossible?.(() => {
            xhr.abort();
        });

        xhr.send(options.body);
    });

const customFetch = (uri: any, options: any) => {
    if (options.onProgress) {
        return uploadFetch(uri, options);
    }
    return fetch(uri, options);
};

const httpLink = new HttpLink({ uri: API_URL });

const uploadLink = createUploadLink({
    uri: API_URL,
    redentials: "same-origin",
    fetch: customFetch as any,
});

const terminatingLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        const isUploadAction = lowerCase(definition.name.value).includes(
            "upload",
        );

        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "mutation" &&
            isUploadAction
        );
    },
    concat(authLink, uploadLink),
    concat(authLink, httpLink),
);

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: from([errorLink, terminatingLink]),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: { fetchPolicy: "cache-and-network" },
        },
    });
}

export const initializeApollo = (initialState = null) => {
    const initializeApolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        const existingCache = initializeApolloClient.extract();
        initializeApolloClient.cache.restore({
            ...existingCache,
            ...initialState,
        });
    }

    if (typeof window === "undefined") return initializeApolloClient;

    if (!apolloClient) apolloClient = initializeApolloClient;

    return initializeApolloClient;
};

export function addApolloState(
    client: ApolloClient<NormalizedCacheObject>,
    pageProps: any,
) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_PROPS] = client.cache.extract();
    }

    return pageProps;
}

export function useApolloHooks(pageProps: any) {
    const state = pageProps[APOLLO_PROPS];
    const client = useMemo(() => initializeApollo(state), [state]);

    return client;
}
