import type { LoadYear } from 'types/loadTypes';
import type {
    Year, Globals,
} from 'types/provideTypes';
import { yearScheme } from 'types/provideTypes';


import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { apiUrl } from 'helper/links';
import { fetchLoginStatusAsync } from 'helper/loggedIn';
import { getGlobalsAsync } from 'stores/globals';

export async function loadYearAsync(
    fetch: typeof globalThis.fetch,
    year: number | undefined = undefined,
): Promise<LoadYear> {
    let yearRoute: string = '/api/events';
    if (year) {
        yearRoute += '/' + year;
    }

    // call
    const loggedInPromise: Promise<boolean> = fetchLoginStatusAsync(fetch);
    const yearDataPromise: Promise<Response> = fetch(apiUrl(yearRoute));
    const globalsPromise: Promise<Globals> = getGlobalsAsync(fetch);

    // data
    const loggedIn: boolean = await loggedInPromise;
    const yearData: Year    = await checkAndParseInputDataAsync(
        await yearDataPromise,
        yearScheme,
        `Serveranfrage für das Jahr ${year} nicht erfolgreich.`,
        `Unerwartete Daten für das Jahr ${year}.`,
    );

    return {
        loggedIn,
        globals: await globalsPromise,
        year:    yearData,
    };
}
