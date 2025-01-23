import type { LoadResetPassword } from 'types/loadTypes';

import { getGlobalsAsync } from 'stores/globals';
import { redirect } from '@sveltejs/kit';

export async function load({
                               fetch,
                               url,
                           }: {
    fetch: typeof globalThis.fetch,
    url: URL
}): Promise<LoadResetPassword> {
    const globalsPromise       = getGlobalsAsync(fetch);
    const token: string | null = url.searchParams.get('token');
    if (!token) {
        throw redirect(404, 'token not found');
    }

    return {
        token,
        globals: await globalsPromise,
    };
}
