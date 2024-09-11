import type { LoadBackendPromise } from "types/types";

import { redirectIfUnautorised } from "helper/loggedIn";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadBackendPromise {
    await redirectIfUnautorised(fetch);

    return {};
}
