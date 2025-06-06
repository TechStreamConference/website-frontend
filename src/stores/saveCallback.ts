import {writable, get, type Writable} from 'svelte/store';

type ValueType =
    (() => Promise<boolean>)
    | undefined;
const _callback: Writable<ValueType> = writable(undefined);

export function save_callback(): ValueType {
    return get(_callback);
}

export function reset_save_callback(): void {
    _callback.set(undefined);
}

export function set_save_callback(callback: () => Promise<boolean>): void {
    _callback.set(callback);
}
