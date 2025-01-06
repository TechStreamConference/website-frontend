import type { LoadRegister } from 'types/loadTypes';
import type { Globals } from 'types/provideTypes';

import { fetchLoginStatusAsync } from 'helper/loggedIn';
import { getGlobalsAsync } from 'stores/globals';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadRegister> {
    // call
    const globalsPromise: Promise<Globals> = getGlobalsAsync(fetch);
    const loggedInPromise: Promise<boolean> = fetchLoginStatusAsync(fetch);

    // data
    const loggedIn: boolean = await loggedInPromise;

    return {
        loggedIn,
        globals: await globalsPromise,
    };
}
