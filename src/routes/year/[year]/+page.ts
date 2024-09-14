import type { LoadYearPromise } from "types/types";

import { loadYearAsync } from "./year";

export async function load({ fetch, params }: { fetch: typeof globalThis.fetch, params: { year: string } }): LoadYearPromise {
    return await loadYearAsync(fetch, params);
}
