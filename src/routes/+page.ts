import type { PageLoad } from "./$types";
import type { LoadYearPromise } from "types/types";

import { loadCurrentYear } from "./year/[year]/year";

export const load: PageLoad = async ({ fetch }: { fetch: typeof globalThis.fetch }): LoadYearPromise => {
    return await loadCurrentYear(fetch);
}
