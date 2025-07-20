import type {LoadRegister} from 'types/loadTypes';
import type {Globals} from 'types/provideTypes';

import {fetchLoginStatusAsync} from 'helper/loggedIn';
import {getGlobalsAsync} from 'stores/globals';

export async function load({
                               fetch,
                               url,
                           }: {
    fetch: typeof globalThis.fetch,
    url: URL
}): Promise<LoadRegister> {
    // call
    const globalsPromise: Promise<Globals> = getGlobalsAsync(fetch);
    const loggedInPromise: Promise<boolean> = fetchLoginStatusAsync(fetch);
    const token: string | null = url.searchParams.get('token');

    return {
        loggedIn: await loggedInPromise,
        globals: await globalsPromise,
        token,
    };
}
