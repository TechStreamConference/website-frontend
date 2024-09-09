import { checkAndRedirect } from "helper/loggedIn";

export type LoadBackend = Promise<{}>;

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadBackend {
    await checkAndRedirect(fetch, '/login', true);

    return {};
}
