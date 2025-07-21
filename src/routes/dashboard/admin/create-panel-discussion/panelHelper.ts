import type {DashboardAllPersons, DashboardPendingTalk} from 'types/dashboardProvideTypes';

import {dashboardAllPersonsScheme} from 'types/dashboardProvideTypes';
import {apiUrl} from 'helper/links';
import {checkAndParseInputDataAsync} from 'helper/parseJson';

export async function loadPossibleHosts(fetch: typeof globalThis.fetch, eventId: number): Promise<DashboardAllPersons> {
    const possibleHostsFetchPromise = fetch(apiUrl(`/dashboard/admin/talk/possible-hosts/${eventId}`));

    const possibleHostsParsePromise = checkAndParseInputDataAsync(
        await possibleHostsFetchPromise,
        dashboardAllPersonsScheme,
        `Serveranfrage für possible hosts von event ID '${eventId} nicht erfolgreich.'`,
        `unerwartete Daten für possible hosts von event ID '${eventId}'.`,
    );

    return await possibleHostsParsePromise;
}

export function initializePendingTalk(): DashboardPendingTalk {
    return {
        id: 0,
        title: '',
        requested_changes: '',
        event_id: 0,
        notes: 'Dieses Feld wird ignoriert.',
        description: '',
        possible_durations: [],
        tags: [],
        speaker: {
            id: 0,
            requested_changes: '',
            user_id: 0,
            bio: '',
            short_bio: '',
            name: '',
            photo: '',
            visible_from: '',
            is_approved: false,
        },
    };
}
