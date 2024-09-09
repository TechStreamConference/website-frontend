import { checkLoggedIn } from "helper/loggedIn";

export type LoadYear = Promise<{ currentYear: Number; loggedIn: Boolean }>;

export async function loadYear(fetch: Function): LoadYear {
    const loggedIn: Boolean = await checkLoggedIn(fetch);
    const currentYear: Number = 2025; // TODO: load from database

    return {
        currentYear: currentYear,
        loggedIn: loggedIn
    }
}