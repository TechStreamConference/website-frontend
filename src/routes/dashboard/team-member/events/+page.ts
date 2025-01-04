import type { LoadSpeakerTeamMemberEvent } from 'types/dashboardLoadTypes';

import { loadDataAsync } from 'pageHelper/speakerTeamMemberEvent';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadSpeakerTeamMemberEvent> {
    return await loadDataAsync(fetch, 'team-member');
}
