import { LocalStorageKey } from "@constants/key";

type PayloadTypeAccepted = string | number | boolean | object;

interface LocalStorageInterface {
    set<T extends PayloadTypeAccepted>(
        key: LocalStorageKey,
        payload: T,
    ): Promise<void>;

    get<T>(key: LocalStorageKey): Promise<T>;

    upsert<T extends PayloadTypeAccepted>(
        key: LocalStorageKey,
        payload: T,
    ): Promise<void>;

    remove(key: LocalStorageKey): Promise<void>;
}

class LocalStorage implements LocalStorageInterface {
    async set<T extends PayloadTypeAccepted>(
        key: LocalStorageKey,
        payload: T,
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                localStorage.setItem(key, JSON.stringify(payload));
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    async get<T>(key: LocalStorageKey): Promise<T | null> {
        return new Promise((resolve, reject) => {
            try {
                const value = localStorage.getItem(key);
                if (!value) resolve(null);
                resolve(JSON.parse(value));
            } catch (error) {
                reject(error);
            }
        });
    }

    async upsert<T extends PayloadTypeAccepted>(
        key: LocalStorageKey,
        payload: T,
    ): Promise<void> {
        return await this.set(key, payload);
    }

    async remove(key: LocalStorageKey): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                localStorage.removeItem(key);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
}

const localStoragePromise: LocalStorage = Object.freeze(new LocalStorage());

export { localStoragePromise };
