import type {Writable} from "svelte/store";
import {writable} from "svelte/store";
import {browser} from "$app/environment";

export function createPersistentStore<T, V>(storageKey: string, defaultValue: V): Writable<T> {
    const stored = browser ? localStorage.getItem(storageKey) : undefined;
    const initial = stored ? JSON.parse(stored) : defaultValue;
    const validated = initial ?? defaultValue;

    const store = writable<T>(validated);

    if (browser) {
        store.subscribe(value => {
                if (value) {
                    localStorage.setItem(storageKey, JSON.stringify(value));
                } else {
                    localStorage.removeItem(storageKey);
                }
            }
        )
    }

    return store;
}
