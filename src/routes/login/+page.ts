import type { LoadLoginPromise } from "types/types";
import { getLoginStatusAsync } from "helper/loggedIn";
import { defaultCurrentYear } from "delete/toDelete";

export async function load({ fetch, url }: { fetch: typeof globalThis.fetch, url: URL }): LoadLoginPromise {
    const loggedIn = await getLoginStatusAsync(fetch);
    const showLoginMessage: boolean = url.searchParams.get('showLoginMessage') === 'true';
    const currentYear: number = defaultCurrentYear;

    return {
        loggedIn,
        currentYear,
        showLoginMessage,
    };
}
