import type { LoadUserSocials } from 'types/dashboardLoadTypes';

import { loadDataAsync } from 'pageHelper/loadSocials';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadUserSocials> {
    return await loadDataAsync(fetch);
}
