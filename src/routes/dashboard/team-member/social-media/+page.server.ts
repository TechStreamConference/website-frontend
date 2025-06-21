import type { LoadUserSocials } from 'types/dashboardLoadTypes';

import { loadDataAsync } from 'pageHelper/speakerTeamMemberSocials';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadUserSocials> {
    return await loadDataAsync(fetch);
}
