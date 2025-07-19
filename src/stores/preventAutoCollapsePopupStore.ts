import {writable, get, type Writable} from 'svelte/store';

type ValueType = boolean;
const _preventAutoCollapsePopup: Writable<ValueType> = writable(false);

export function preventAutoCollapsePopup(): boolean {
    return get(_preventAutoCollapsePopup);
}

export function setPreventAutoCollapsePopup(): void {
    _preventAutoCollapsePopup.set(true);
}

export function resetPreventAutoCollapsePopup(): void {
    _preventAutoCollapsePopup.set(false);
}

export function resetPreventAutoCollapsePopupWithDelay(delay: number): void {
    setTimeout(resetPreventAutoCollapsePopup, delay);
}
