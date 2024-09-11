import type { LoadLoginPromise } from "types/types";

import { getLoginStatus } from "helper/loggedIn";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadLoginPromise {
    const loggedIn = await getLoginStatus(fetch);

    const currentYear: number = 2025; // TODO: load from database

    return {
        loggedIn,
        currentYear
    };
}
