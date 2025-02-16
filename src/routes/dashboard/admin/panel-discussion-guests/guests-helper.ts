import type { DashboardAllGuests, DashboardAllTentativeOrAcceptedTalks } from 'types/dashboardProvideTypes';
import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { dashboardAllGuestsScheme, dashboardAllTentativeOrAcceptedTalkScheme } from 'types/dashboardProvideTypes';

export function getNavigationEntries<T extends {
    id: number,
    title: string
}>(entries: T[]): string[] {
    const toReturn: string[] = [];

    for (const entry of entries) {
        toReturn.push(`${entry.id} | ${entry.title}`);
    }

    return toReturn;
}

export async function loadTalksOfEvent(
    fetch: typeof globalThis.fetch,
    id: number,
): Promise<DashboardAllTentativeOrAcceptedTalks> {
    const talkFetchPromise = fetch(apiUrl(`/api/dashboard/admin/tentative-or-accepted-talks/${id}`));

    const talkParsePromise = checkAndParseInputDataAsync(
        await talkFetchPromise,
        dashboardAllTentativeOrAcceptedTalkScheme,
        `Serveranfrage für die Talks für event id '${id}' nicht erfolgreich.`,
        `Unerwartete Daten für die Talks für event id '${id}'`,
    );

    return await talkParsePromise;
}

export async function loadPossibleGuestsOfTalk(
    fetch: typeof globalThis.fetch,
    id: number,
): Promise<DashboardAllGuests> {
    const possibleGuestsFetchPromise = fetch(apiUrl(`/api/dashboard/admin/talk/${id}/possible-guests`));

    const possibleGuestsParsePromise = checkAndParseInputDataAsync(
        await possibleGuestsFetchPromise,
        dashboardAllGuestsScheme,
        `Serveranfrage für die möglichen Gäste für talk id '${id}' nicht erfolgreich.`,
        `Unerwartete Daten für die möglichen Gäste für talk id '${id}'`,
    );

    return await possibleGuestsParsePromise;
}
