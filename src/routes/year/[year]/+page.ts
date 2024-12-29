import type { LoadYear } from 'types/loadTypes';
import { error } from '@sveltejs/kit';

import { loadYearAsync } from 'pageHelper/year';

export async function load({
                               fetch,
                               params,
                           }: {
    fetch: typeof globalThis.fetch,
    params: {
        year: string
    }
}): Promise<LoadYear> {
    const year: number = Number(params.year);
    if (Number.isNaN(year)) {
        throw error(404, `in der URL angegebenes Jahr "${params.year}" ist keine Zahl.`);
    }
    return await loadYearAsync(fetch, year);
}
