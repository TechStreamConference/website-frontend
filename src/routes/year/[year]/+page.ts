import type { PageLoad } from "./$types";
import type { LoadYearPromise } from "types/types";

import { loadYear } from "./year";

export const load: PageLoad = async ({ fetch, params }: { fetch: typeof globalThis.fetch, params: { year: string } }): LoadYearPromise => {
    return await loadYear(fetch, params);
}
