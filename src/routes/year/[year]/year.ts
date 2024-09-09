import { redirect } from "@sveltejs/kit";
import { checkLoggedIn } from "helper/loggedIn";

export type LoadYear = { currentYear: number; displayedYear: number; loggedIn: boolean };
export type LoadYearPromise = Promise<LoadYear>;

export async function loadYear(fetch: Function, params: { year: string }): LoadYearPromise {
    const loggedIn: boolean = await checkLoggedIn(fetch);
    const currentYear: number = 2025; // TODO: load from database
    const displayedYear: number = Number(params.year);

    if (isNaN(displayedYear)) {
        redirect(302, "/404");
    }

    return {
        currentYear,
        displayedYear,
        loggedIn,
    }
}

export async function loadCurrentYear(fetch: Function): LoadYearPromise {
    const loggedIn: boolean = await checkLoggedIn(fetch);
    const currentYear: number = 2025  // TODO: load from database
    const displayedYear: number = currentYear;

    return {
        currentYear,
        displayedYear,
        loggedIn,
    }
}
