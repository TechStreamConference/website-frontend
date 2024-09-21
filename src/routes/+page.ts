import type { LoadYearPromise } from "types/loadTypes";

import { loadCurrentYearAsync } from "./year/[year]/year";

export async function load ({ fetch }: { fetch: typeof globalThis.fetch }): LoadYearPromise {
    return await loadCurrentYearAsync(fetch);
}
