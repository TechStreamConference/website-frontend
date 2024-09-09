import type { LoadBackendPromise } from "types/types";

import { checkAndRedirect } from "helper/loggedIn";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadBackendPromise {
    await checkAndRedirect(fetch, '/login', true);

    return {};
}
