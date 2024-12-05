import type { DashboardAllSpeakerTeamMember, DashboardSpeakerTeamMember } from "types/dashboardProvideTypes";

import { dashboardAllSpeakerTeamMemberScheme } from "types/dashboardProvideTypes";
import { error } from "@sveltejs/kit";
import { apiUrl } from "helper/links";
import { checkAndParseInputDataAsync } from "helper/parseJson";

export async function loadSpecificEvent(fetch: Function, eventID: number): Promise<DashboardSpeakerTeamMember> {
    const eventResponse: Promise<Response> = fetch(apiUrl(`/api/dashboard/speaker/event/${eventID}`));
    const event = await checkAndParseInputDataAsync<DashboardAllSpeakerTeamMember>(
        await eventResponse,
        dashboardAllSpeakerTeamMemberScheme,
        `Serveranfrage für den Speaker-Eintrag für Event ${eventID} nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für den Speaker-Eintrag für das Event ${eventID}. throw error(406)`
    )

    if (event.length != 1) {
        console.error(`Empfangene Speaker Datensätze: ${event.length} | erwartete Speaker Datensätze: 1`)
        throw error(406);
    }

    return event[0];
}
