import type { LoadRegisterPromise } from 'types/loadTypes';
import type { Globals } from 'types/provideTypes';

import { getLoginStatusAsync } from 'helper/loggedIn';
import { checkAndParseGlobals } from 'helper/parseJson';
import { apiUrl } from 'helper/links';

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadRegisterPromise {
    // call
    const globalsPromise: Promise<Response> = fetch(apiUrl('/api/globals'));
    const loggedInPromise: Promise<boolean> = getLoginStatusAsync(fetch);

    // data
    const loggedIn: boolean = await loggedInPromise;
    const globalsData: Globals = await checkAndParseGlobals(await globalsPromise);

    return {
        loggedIn,
        globals: globalsData,
    };
}
