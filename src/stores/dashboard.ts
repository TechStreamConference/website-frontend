import { writable, get, type Writable } from "svelte/store";

const _value: Writable<any> = writable(null);

export function dashboardValue(): any {
    return get(_value);
}


export function setDashboardValue(value: any): void {
    _value.set(structuredClone(value));
}

export function unsetDashboardValue(): void {
    _value.set(null);
}
