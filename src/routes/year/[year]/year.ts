import type { LoadYear } from "types/loadTypes";
import type { Year, Globals } from "types/provideTypes";
import { yearScheme } from "types/provideTypes";


import { checkAndParseGlobalsAsync, checkAndParseInputDataAsync } from "helper/parseJson";
import { apiUrl } from "helper/links";
import { fetchLoginStatusAsync } from "helper/loggedIn";

export async function loadYearAsync(fetch: Function, year: number | undefined = undefined): Promise<LoadYear> {
    let yearRoute: string = '/api/events';
    if (year) {
        yearRoute += '/' + year;
    }

    // call
    const loggedInPromise: Promise<boolean> = fetchLoginStatusAsync(fetch);
    const yearDataPromise: Promise<Response> = fetch(apiUrl(yearRoute));
    const globalsPromise: Promise<Response> = fetch(apiUrl('/api/globals'));

    // data
    const loggedIn: boolean = await loggedInPromise;
    const yearData: Year = await checkAndParseInputDataAsync<Year>(
        await yearDataPromise,
        yearScheme,
        `Serveranfrage für das Jahr ${year} nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für das Jahr ${year}. throw error(406)`
    );
    const globalsData: Globals = await checkAndParseGlobalsAsync(await globalsPromise);

    return {
        loggedIn,
        globals: globalsData,
        year: yearData,
    }
}
