import type {Writable} from 'svelte/store';
import {writable, get} from 'svelte/store';
import type {Globals} from '@/types/provideTypes';
import {apiUrl} from '@/helper/links';
import {checkAndParseGlobalsAsync} from '@/helper/parseJson';

type ValueType =
    Globals
    | undefined;
const _globals: Writable<ValueType> = writable(undefined);
let timer: number | undefined = undefined;


export async function get_global(fetch: typeof globalThis.fetch): Promise<Globals> {
    const value = get(_globals);

    if (value) {
        return value;
    }

    return await get_global_forced(fetch);
}

export async function get_global_forced(fetch: typeof globalThis.fetch): Promise<Globals> {
    const globalsResponse = await fetch(apiUrl('/globals'));
    const globalsData: Globals = await checkAndParseGlobalsAsync(globalsResponse);

    reset_globals();

    _globals.set(globalsData);
    timer = setTimeout(reset_globals, 600000); // ca. 10 minutes

    return globalsData;
}

export function reset_globals(): void {
    _globals.set(undefined);

    clearTimeout(timer);
    timer = undefined;
}
