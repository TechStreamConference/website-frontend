import type { LoadBackendPromise } from "types/types";

import { getLoginStatusAndCheckRedirect } from "helper/loggedIn";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadBackendPromise {
    await getLoginStatusAndCheckRedirect(fetch, '/login', true);

    return {};
}
