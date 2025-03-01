import type { LoadVerifyEmail } from 'types/loadTypes';
import type { Globals } from 'types/provideTypes';

import { apiUrl } from 'helper/links';
import { getGlobalsAsync } from 'stores/globals';

export const ssr = false; // Disable Server Side Rendering to make sure the provided data gets only send once.

export async function load({
                               fetch,
                               url,
                           }: {
    fetch: typeof globalThis.fetch,
    url: URL
}): Promise<LoadVerifyEmail> {
    const globalsPromise: Promise<Globals> = getGlobalsAsync(fetch);

    const token: string | null = url.searchParams.get('token');
    if (!token) {
        console.error('no token in URL');
        return {
            success: false,
            globals: await globalsPromise,
        };
    }

    const toSave   = { token };
    const response = await fetch(apiUrl('/account/verify'), {
        method: 'POST',
        body:   JSON.stringify(toSave),
    });

    if (!response.ok) {
        if (response.status === 400) {
            console.error(await response.json());
        }

        return {
            success: false,
            globals: await globalsPromise,
        };
    }

    return {
        success: true,
        globals: await globalsPromise,
    };
}
