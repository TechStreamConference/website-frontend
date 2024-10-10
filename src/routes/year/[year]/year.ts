import type { LoadYearPromise } from "types/loadTypes";
import type { Year } from "types/provideTypes";
import { yearScheme } from "types/provideTypes";


import { parseProvidedJsonAsync } from "helper/parseJson";
import { apiUrl } from "helper/links";
import { error } from "@sveltejs/kit";
import { getLoginStatusAsync } from "helper/loggedIn";
import { defaultCurrentYear } from "delete/toDelete";

export async function loadYearAsync(fetch: Function, year: number | undefined = undefined): LoadYearPromise {
    const loggedInPromise: Promise<boolean> = getLoginStatusAsync(fetch);
    let route: string = '/api/events';
    if (year) {
        route += '/' + year;
    }
    const yearDataPromise: Promise<Response> = fetch(apiUrl(route));
    const currentYear: number = defaultCurrentYear; // get from an extra route later on

    const loggedIn: boolean = await loggedInPromise;
    const yearDataResponse: Response = await yearDataPromise;

    if (!yearDataResponse.ok) {
        throw error(400, `Serveranfrage für das Jahr ${year} nicht erfolgreich.`)
    }

    const yearData = await parseProvidedJsonAsync<Year>(yearDataResponse, yearScheme);

    if (!yearData) {
        throw error(400, `Unerwartete Daten für das Jahr ${year}.`)
    }

    return {
        loggedIn,
        currentYear,
        year: yearData,
    }
}
