import type { LoadContact } from 'types/loadTypes';
import type { Globals } from 'types/provideTypes';

import { fetchLoginStatusAsync } from 'helper/loggedIn';
import { getGlobalsAsync } from 'stores/globals';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadContact> {
    const loggedInPromise: Promise<boolean> = fetchLoginStatusAsync(fetch);
    const globalsPromise: Promise<Globals>  = getGlobalsAsync(fetch);

    return {
        loggedIn : await loggedInPromise,
        globals: await globalsPromise,
    };
}
