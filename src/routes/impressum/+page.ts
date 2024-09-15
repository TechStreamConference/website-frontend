import type { LoadImpressumPromise } from "types/types";
import { getLoginStatusAsync } from "helper/loggedIn";
import { defaultCurrentYear } from "delete/toDelete";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadImpressumPromise {
    const loggedIn = await getLoginStatusAsync(fetch);
    const currentYear = defaultCurrentYear;

    return {
        loggedIn,
        currentYear
    }
}
