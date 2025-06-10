import type {Writable} from 'svelte/store';
import type {Globals} from '@/types/provideTypes';

import {get} from 'svelte/store';
import {api_url} from '@/helper/links';
import {check_and_parse_globals} from '@/helper/parseJson';
import {create_persistent_store} from "@/stores/persistantStore";


type ValueType =
    Globals
    | undefined;
const _globals: Writable<ValueType> = create_persistent_store<ValueType>('TEST_CONF_GLOBALS', undefined);
let timer: number | undefined = undefined;


export async function get_globals(): Promise<Globals> {
    const value = get(_globals);

    if (value) {
        return value;
    }

    return await get_globals_forced();
}

export async function get_globals_forced(): Promise<Globals> {
    const globalsResponse = await fetch(api_url('/globals'));
    const globalsData: Globals = await check_and_parse_globals(globalsResponse);

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
