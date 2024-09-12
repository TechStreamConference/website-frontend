import type { LoadYearPromise } from "types/types";

import { loadCurrentYear } from "./year/[year]/year";

export async function load ({ fetch }: { fetch: typeof globalThis.fetch }): LoadYearPromise {
    return await loadCurrentYear(fetch);
}
