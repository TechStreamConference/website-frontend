import type { LoadRegister } from 'types/loadTypes';
import type { Globals } from 'types/provideTypes';

import { fetchLoginStatusAsync } from 'helper/loggedIn';
import { checkAndParseGlobalsAsync } from 'helper/parseJson';
import { apiUrl } from 'helper/links';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadRegister> {
    // call
    const globalsPromise: Promise<Response> = fetch(apiUrl('/api/globals'));
    const loggedInPromise: Promise<boolean> = fetchLoginStatusAsync(fetch);

    // data
    const loggedIn: boolean = await loggedInPromise;
    const globalsData: Globals = await checkAndParseGlobalsAsync(await globalsPromise);

    return {
        loggedIn,
        globals: globalsData,
    };
}
