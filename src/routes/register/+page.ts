import { checkAndRedirect } from 'helper/loggedIn';

export type LoadRegister = Promise<{ currentYear: Number }>

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadRegister {
    await checkAndRedirect(fetch, '/', false);

    const currentYear: Number = 2025; // TODO: load from database

    return {
        currentYear: currentYear
    };
}
