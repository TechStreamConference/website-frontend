import type { DashboardSpeakerTeamMember } from "types/dashboardProvideTypes";

import { dashboardSpeakerTeamMemberScheme } from "types/dashboardProvideTypes";
import { apiUrl } from "helper/links";
import { checkAndParseInputDataAsync } from "helper/parseJson";

export async function loadSpecificEvent(fetch: Function, eventID: number): Promise<DashboardSpeakerTeamMember> {
    const eventResponse: Promise<Response> = fetch(apiUrl(`/api/dashboard/speaker/event/${eventID}`));
    const event = await checkAndParseInputDataAsync<DashboardSpeakerTeamMember>(
        await eventResponse,
        dashboardSpeakerTeamMemberScheme,
        `Serveranfrage für den Speaker-Eintrag für Event ${eventID} nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für den Speaker-Eintrag für das Event ${eventID}. throw error(406)`
    )

    return event;
}
