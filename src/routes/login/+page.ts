import type { LoadLogin } from 'types/loadTypes';
import type { Globals } from 'types/provideTypes';
import { apiUrl } from 'helper/links';
import { fetchLoginStatusAsync } from 'helper/loggedIn';
import { checkAndParseGlobalsAsync } from 'helper/parseJson';

export async function load({
                               fetch,
                               url,
                           }: {
    fetch: typeof globalThis.fetch,
    url: URL
}): Promise<LoadLogin> {
    // call
    const loggedInPromise: Promise<boolean> = fetchLoginStatusAsync(fetch);
    const globalsPromise: Promise<Response> = fetch(apiUrl('/api/globals'));

    // data
    const showLoginMessage: boolean = url.searchParams.get('showLoginMessage') === 'true';
    const loggedIn: boolean         = await loggedInPromise;
    const globalsData: Globals      = await checkAndParseGlobalsAsync(await globalsPromise);

    return {
        loggedIn,
        globals: globalsData,
        showLoginMessage,
    };
}
