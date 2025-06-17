import type { LoadImprint } from 'types/loadTypes';
import type { Globals } from 'types/provideTypes';

import { fetchLoginStatusAsync } from 'helper/loggedIn';
import { getGlobalsAsync } from 'stores/globals';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadImprint> {
    // call
    const loggedInPromise: Promise<boolean> = fetchLoginStatusAsync(fetch);
    const globalsPromise: Promise<Globals>  = getGlobalsAsync(fetch);

    // data
    const loggedIn: boolean = await loggedInPromise;

    return {
        loggedIn,
        globals: await globalsPromise,
    };
}
