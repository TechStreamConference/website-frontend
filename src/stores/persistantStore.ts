import type {Writable} from "svelte/store";
import {writable} from "svelte/store";

export function create_persistent_store<T, V>(storage_key: string, default_value: V): Writable<T> {
    const stored = localStorage.getItem(storage_key);
    const initial = stored ? JSON.parse(stored) : default_value;

    const store = writable<T>(initial);

    store.subscribe(value => {
            if (value) {
                localStorage.setItem(storage_key, JSON.stringify(value));
            } else {
                localStorage.removeItem(storage_key);
            }
        }
    )

    return store;
}
