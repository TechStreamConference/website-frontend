import { apiUrl } from "helper/links";
import { checkAndParseGlobalsAsync } from "helper/parseJson";
import type { LoadVerifyEmail } from "types/loadTypes";
import type { Globals } from "types/provideTypes";

export const ssr = false;

export async function load({ fetch, url }: { fetch: typeof globalThis.fetch, url: URL }): Promise<LoadVerifyEmail> {
    const globalsPromise: Promise<Response> = fetch(apiUrl('/api/globals'));

    const token: string | null = url.searchParams.get('token');
    if (!token) {
        console.error('no token in URL');
        const globalsData: Globals = await checkAndParseGlobalsAsync(await globalsPromise);
        return { success: false, globals: globalsData };
    }

    const toSave = { token };
    const response = await fetch(apiUrl('/api/account/verify'), {
        method: 'POST',
        body: JSON.stringify(toSave)
    });
    const globalsData: Globals = await checkAndParseGlobalsAsync(await globalsPromise);

    if (!response.ok) {
        if (response.status === 400) {
            console.error(await response.json());
        }

        return { success: false, globals: globalsData };
    }

    return { success: true, globals: globalsData };
}
