import type { LoadLogin } from 'types/loadTypes';
import type { Globals } from 'types/provideTypes';

import { fetchLoginStatusAsync } from 'helper/loggedIn';
import { getGlobalsAsync } from 'stores/globals';

export async function load({
                               fetch,
                               url,
                           }: {
    fetch: typeof globalThis.fetch,
    url: URL
}): Promise<LoadLogin> {
    // call
    const loggedInPromise: Promise<boolean> = fetchLoginStatusAsync(fetch);
    const globalsPromise: Promise<Globals>  = getGlobalsAsync(fetch);

    // data
    const showLoginMessage: boolean = url.searchParams.get('showLoginMessage') === 'true';
    const loggedIn: boolean         = await loggedInPromise;

    return {
        loggedIn,
        globals: await globalsPromise,
        showLoginMessage,
    };
}
