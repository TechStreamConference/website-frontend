import type { LoadLoginPromise } from "types/types";

import { getLoginStatusAndCheckRedirect } from "helper/loggedIn";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadLoginPromise {
    await getLoginStatusAndCheckRedirect(fetch, '/', false);

    const currentYear: number = 2025; // TODO: load from database

    return {
        currentYear: currentYear
    };
}
