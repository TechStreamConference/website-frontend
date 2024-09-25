import type { LoadYearPromise } from "types/loadTypes";
import { redirect } from "@sveltejs/kit";

import { loadYearAsync } from "./year";

export async function load({ fetch, params }: { fetch: typeof globalThis.fetch, params: { year: string } }): LoadYearPromise {
    const year: number = Number(params.year);
    if (Number.isNaN(year)) {
        redirect(302, "/404");
    }
    return await loadYearAsync(fetch, year);
}
