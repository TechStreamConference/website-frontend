import { checkAndRedirect } from "helper/loggedIn";

export type LoadLogin = Promise<{ currentYear: Number }>;

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadLogin {
    await checkAndRedirect(fetch, '/', false);

    const currentYear: Number = 2025; // TODO: load from database

    return {
        currentYear: currentYear
    };
}
