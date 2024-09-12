import type { LoadRegisterPromise } from 'types/types';

import { getLoginStatus } from 'helper/loggedIn';

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadRegisterPromise {
    const loggedIn = await getLoginStatus(fetch);

    const currentYear: number = 2025; // TODO: load from database

    return {
        loggedIn,
        currentYear
    };
}
