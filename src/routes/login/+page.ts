import type { LoadLoginPromise } from "types/loadTypes";
import type { Globals } from "types/provideTypes";
import { apiUrl } from "helper/links";
import { getLoginStatusAsync } from "helper/loggedIn";
import { checkAndParseGlobals } from "helper/parseJson";

export async function load({ fetch, url }: { fetch: typeof globalThis.fetch, url: URL }): LoadLoginPromise {
    // call
    const loggedInPromise: Promise<boolean> = getLoginStatusAsync(fetch);
    const globalsPromise: Promise<Response> = fetch(apiUrl('/api/globals'));

    // data
    const showLoginMessage: boolean = url.searchParams.get('showLoginMessage') === 'true';
    const loggedIn: boolean = await loggedInPromise;
    const globalsData: Globals = await checkAndParseGlobals(await globalsPromise);

    return {
        loggedIn,
        globals: globalsData,
        showLoginMessage,
    };
}
