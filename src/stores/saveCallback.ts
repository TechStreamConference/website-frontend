import {writable, get, type Writable} from 'svelte/store';
import {create_persistent_store} from "@/stores/persistantStore";

type ValueType =
    (() => Promise<boolean>)
    | undefined;
const _callback: Writable<ValueType> = create_persistent_store<ValueType>('TEST_CONF_SAVE_CALLBACK', undefined);

export function save_callback(): ValueType {
    return get(_callback);
}

export function reset_save_callback(): void {
    _callback.set(undefined);
}

export function set_save_callback(callback: () => Promise<boolean>): void {
    _callback.set(callback);
}
