import type { LoadImpressumPromise } from "types/types";
import { getLoginStatus } from "helper/loggedIn";
import { defaultCurrentYear } from "delete/toDelete";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadImpressumPromise {
    const loggedIn = await getLoginStatus(fetch);
    const currentYear = defaultCurrentYear;

    return {
        loggedIn,
        currentYear
    }
}
