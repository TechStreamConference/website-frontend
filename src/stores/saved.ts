import {get, type Writable} from 'svelte/store';
import {create_persistent_store} from "@/stores/persistantStore";

export const _unsavedChanges: Writable<boolean> = create_persistent_store<boolean>('TEST_CONF_UNSAVED_CHANGES', false);

export function unsaved_changes(): boolean {
    return get(_unsavedChanges);
}

export function reset_unsaved_changes(): void {
    _unsavedChanges.set(false);
}

export function set_unsaved_changes(): void {
    _unsavedChanges.set(true);
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function use_unsaved_changes(wrappedFunction: Function): Function {
    set_unsaved_changes();
    return wrappedFunction;
}
