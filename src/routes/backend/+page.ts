import type { LoadBackendPromise } from "types/loadTypes";

import { redirectIfUnauthorizedAsync } from "helper/loggedIn";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadBackendPromise {
    await redirectIfUnauthorizedAsync(fetch);

    return {};
}
