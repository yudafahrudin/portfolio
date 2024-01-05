import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { serializeObjectUTM } from "@utils/array";
import { isStringMatch } from "@utils/validation";

export const routeQuery = (path: string, query: ParsedUrlQuery) => {
    const tempQuery = serializeObjectUTM(query);
    const isQueryHasSessionID = isStringMatch(path, "?") ? "&" : "?";
    const queryOptions = tempQuery ? `${isQueryHasSessionID}${tempQuery}` : "";
    return `${path}${queryOptions}`;
};

export const routeTo = (
    router: NextRouter,
    routePath: string,
    replace = false,
    customQuery = {},
    withOldQuery = true,
) => {
    const { query } = router;
    const urlWithQuery = routeQuery(routePath, query);
    const routerMethod = replace ? "replace" : "push";

    return router[routerMethod](
        {
            pathname: routePath,
            query: {
                ...(withOldQuery && query),
                ...customQuery,
            },
        },
        urlWithQuery,
    );
};

export const routeToExternal = (
    url: string,
    target: "_blank" | "_self" = "_blank",
) => {
    return window.open(url, target);
};
