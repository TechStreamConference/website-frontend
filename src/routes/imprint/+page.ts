import type { LoadImprintPromise } from "types/loadTypes";
import type { Globals } from "types/provideTypes";
import { apiUrl } from "helper/links";
import { getLoginStatusAsync } from "helper/loggedIn";
import { checkAndParseGlobals } from "helper/parseJson";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadImprintPromise {
    // call
    const loggedInPromise: Promise<boolean> = getLoginStatusAsync(fetch);
    const globalsPromise: Promise<Response> = fetch(apiUrl('/globals'));

    // data
    const loggedIn: boolean = await loggedInPromise;
    const globalsData: Globals = await checkAndParseGlobals(await globalsPromise);

    return {
        loggedIn,
        globals: globalsData,
    }
}
