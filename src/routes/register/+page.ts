import type { LoadRegisterPromise } from 'types/types';

import { getLoginStatus } from 'helper/loggedIn';
import { defaultcurrentYear } from 'delete/toDelete';

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadRegisterPromise {
    const loggedIn = await getLoginStatus(fetch);

    const currentYear: number = defaultcurrentYear;

    return {
        loggedIn,
        currentYear
    };
}
