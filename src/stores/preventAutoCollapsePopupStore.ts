import {writable, get, type Writable} from 'svelte/store';

type ValueType = boolean;
const _preventAutoCollapsePopup: Writable<ValueType> = writable(false);

export function preventAutoCollapsePopup(): boolean {
    console.log('preventAutoCollapsePopup');
    return get(_preventAutoCollapsePopup);
}

export function setPreventAutoCollapsePopup(): void {
    _preventAutoCollapsePopup.set(true);
    console.log('setPreventAutoCollapsePopup');
}

export function resetPreventAutoCollapsePopup(): void {
    _preventAutoCollapsePopup.set(false);
    console.log('resetPreventAutoCollapsePopup');
}

export function resetPreventAutoCollapsePopupWithDelay(delay: number): void {
    setTimeout(resetPreventAutoCollapsePopup, delay);
    console.log('resetPreventAutoCollapsePopupWithDelay');
}
