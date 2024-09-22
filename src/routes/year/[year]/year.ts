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

    const displayedYear: number = year ? year : 2025; // get in event later on
    const currentYear: number = defaultCurrentYear; // get on an extra route later on

    const loggedIn: boolean = await loggedInPromise;
    const yearDataResponse: Response = await yearDataPromise;
    let yearData: Year;
    if (yearDataResponse.ok) {
        yearData = await yearDataResponse.json();
        for (let i = 0; i < yearData.speakers.length; ++i) {
            // TODO: remove when backend provides Speaker-ID
            // https://github.com/TechStreamConference/website-backend/issues/22
            if (yearData.speakers[i].id === undefined) {
                yearData.speakers[i].id = `${i}`;
            }
        }
    } else {
        redirect(302, "/404");
    }

    return {
        loggedIn,
        currentYear,
        displayedYear,
        year: yearData,
    }
}
