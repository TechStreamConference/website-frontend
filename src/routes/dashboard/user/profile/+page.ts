import type { LoadUserProfile } from 'types/dashboardLoadTypes';

import { loadUserData } from './profileHelper';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadUserProfile> {

    const userDataPromise = loadUserData(fetch);

    return {
        userData: await userDataPromise,
    };
}
