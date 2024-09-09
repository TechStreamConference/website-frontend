import { loadYear } from "./year/[year]/year";
import type { LoadYear } from "./year/[year]/year";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadYear {
    return loadYear(fetch);

}
