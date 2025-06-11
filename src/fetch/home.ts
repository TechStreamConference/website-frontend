import type {LoadYear} from "@/types/loadTypes";
import {api_url} from "@/helper/links";
import {check_and_parse_input_data} from "@/helper/parseJson";
import {year_scheme} from "@/types/provideTypes";

export async function load_home_page(year: number | undefined = undefined): Promise<LoadYear> {
    let year_route = '/events';
    if (year) {
        year_route += '/' + year;
    }

    const year_fetch = fetch(api_url(year_route));

    const year_data = check_and_parse_input_data(
        await year_fetch,
        year_scheme,
        `Serveranfrage für das Jahr ${year} nicht erfolgreich.`,
        `Unerwartete Daten für das Jahr ${year}.`,
    )

    return {
        year: await year_data,
    }
}
