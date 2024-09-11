import type { LoadYearPromise } from "types/types";

import { redirect } from "@sveltejs/kit";
import { getLoginStatus } from "helper/loggedIn";



export async function loadYear(fetch: Function, params: { year: string }): LoadYearPromise {
    const loggedIn: boolean = await getLoginStatus(fetch);
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
    const loggedIn: boolean = await getLoginStatus(fetch);
    const currentYear: number = 2025  // TODO: load from database
    const displayedYear: number = currentYear;

    return {
        currentYear,
        displayedYear,
        loggedIn,
    }
}