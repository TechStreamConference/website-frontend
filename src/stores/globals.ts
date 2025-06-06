import type { Writable } from 'svelte/store';
import { writable, get } from 'svelte/store';
import type { Globals } from 'types/provideTypes';
import { apiUrl } from 'helper/links';
import { checkAndParseGlobalsAsync } from 'helper/parseJson';

type ValueType =
    Globals
    | undefined;
const _globals: Writable<ValueType> = writable(undefined);
let timer: number | undefined       = undefined;


export async function getGlobalsAsync(fetch: typeof globalThis.fetch): Promise<Globals> {
    const value = get(_globals);

    if (value) {
        return value;
    }

    return await getGlobalsAsyncForced(fetch);
}

export async function getGlobalsAsyncForced(fetch: typeof globalThis.fetch): Promise<Globals> {
    const globalsResponse      = await fetch(apiUrl('/globals'));
    const globalsData: Globals = await checkAndParseGlobalsAsync(globalsResponse);

    resetGlobals();

    _globals.set(globalsData);
    timer = setTimeout(resetGlobals, 600000); // ca. 10 minutes

    return globalsData;
}

export function resetGlobals(): void {
    _globals.set(undefined);

    clearTimeout(timer);
    timer = undefined;
}
