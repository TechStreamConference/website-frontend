import { writable, get, type Writable } from "svelte/store";
type ValueType = (() => Promise<boolean>) | undefined;
const _callback: Writable<ValueType> = writable(undefined);

export function saveCallback(): ValueType {
    return get(_callback);
}

export function resetSaveCallback(): void {
    _callback.set(undefined);
}

export function setSaveCallback(callback: () => Promise<boolean>): void {
    _callback.set(callback);
}
