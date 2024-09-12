import type { LoadLoginPromise } from "types/types";
import { getLoginStatus } from "helper/loggedIn";
import { defaultcurrentYear } from "delete/toDelete";

export async function load({ fetch, url }: { fetch: typeof globalThis.fetch, url: URL }): LoadLoginPromise {
    const loggedIn = await getLoginStatus(fetch);
    const showLoginMessage: boolean = url.searchParams.get('showLoginMessage') === 'true';
    const currentYear: number = defaultcurrentYear;

    return {
        loggedIn,
        showLoginMessage,
        currentYear
    };
}
