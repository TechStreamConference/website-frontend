import type { LoadRegisterPromise } from 'types/types';

import { getLoginStatusAsync } from 'helper/loggedIn';
import { defaultCurrentYear } from 'delete/toDelete';

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadRegisterPromise {
    const loggedIn = await getLoginStatusAsync(fetch);

    const currentYear: number = defaultCurrentYear;

    return {
        loggedIn,
        currentYear
    };
}
