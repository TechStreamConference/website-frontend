import { loadYear } from "./year";
import type { LoadYear } from "./year";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): LoadYear {
    return loadYear(fetch);

}