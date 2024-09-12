import type { LoadBackendPromise } from "types/types";

import { redirectIfUnauthorized } from "helper/loggedIn";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadBackendPromise {
    await redirectIfUnauthorized(fetch);

    return {};
}
