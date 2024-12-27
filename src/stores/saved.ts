import { writable, get, type Writable } from 'svelte/store';

export const _unsavedChanges: Writable<boolean> = writable(false);

export function unsavedChanges(): boolean {
    return get(_unsavedChanges);
}

export function resetUnsavedChanges(): void {
    _unsavedChanges.set(false);
}

export function setUnsavedChanges(): void {
    _unsavedChanges.set(true);
}

export function useUnsavedChanges(wrappedFunction: Function): Function {
    setUnsavedChanges();
    return wrappedFunction;
}
