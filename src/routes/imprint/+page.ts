import type { LoadImprint } from 'types/loadTypes';
import type { Globals } from 'types/provideTypes';
import { apiUrl } from 'helper/links';
import { fetchLoginStatusAsync } from 'helper/loggedIn';
import { checkAndParseGlobalsAsync } from 'helper/parseJson';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadImprint> {
    // call
    const loggedInPromise: Promise<boolean> = fetchLoginStatusAsync(fetch);
    const globalsPromise: Promise<Response> = fetch(apiUrl('/api/globals'));

    // data
    const loggedIn: boolean = await loggedInPromise;
    const globalsData: Globals = await checkAndParseGlobalsAsync(await globalsPromise);

    return {
        loggedIn,
        globals: globalsData,
    };
}
