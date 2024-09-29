import type { LoadYearPromise } from "types/loadTypes";
import type { Year } from "types/provideTypes";

import { apiUrl } from "helper/links";
import { redirect } from "@sveltejs/kit";
import { getLoginStatusAsync } from "helper/loggedIn";
import { defaultCurrentYear } from "delete/toDelete";

export async function loadYearAsync(fetch: Function, year: number | undefined = undefined): LoadYearPromise {
    const loggedInPromise: Promise<boolean> = getLoginStatusAsync(fetch);
    let route: string = '/api/events';
    if (year) {
        route += '/' + year;
    }
    const yearDataPromise: Promise<Response> = fetch(apiUrl(route));

    const currentYear: number = defaultCurrentYear; // get on an extra route later on

    const loggedIn: boolean = await loggedInPromise;
    const yearDataResponse: Response = await yearDataPromise;
    let yearData: Year;
    if (yearDataResponse.ok) {
        // TODO: add links when provided
        yearData = await yearDataResponse.json();
    } else {
        redirect(302, "/404");
    }

    return {
        loggedIn,
        currentYear,
        year: yearData,
    }
}
