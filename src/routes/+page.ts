import type { LoadYear } from 'types/loadTypes';

import { loadYearAsync } from './year/[year]/year';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadYear> {
    return await loadYearAsync(fetch);
}
