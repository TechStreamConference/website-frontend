import type { LoadAdminApproval } from 'types/dashboardLoadTypes';

import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import {
    dashboardAllApprovalSocialMediaLinkScheme,
    dashboardAllApprovalSpeakerTeamMemberScheme,
} from 'types/dashboardProvideTypes';


export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadAdminApproval> {
    const speakerResponse: Promise<Response>     = fetch(apiUrl('/api/dashboard/admin/approval/speaker'));
    const teamMemberResponse: Promise<Response>  = fetch(apiUrl('/api/dashboard/admin/approval/team-member'));
    const socialMediaResponse: Promise<Response> = fetch(apiUrl('/api/dashboard/admin/approval/social-media-link'));

    const speaker     = await checkAndParseInputDataAsync(
        await speakerResponse,
        dashboardAllApprovalSpeakerTeamMemberScheme,
        `Serveranfrage für die Freigabedaten der Speaker nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für die Freigabedaten der Speaker. throw error(406)`,
    );
    const teamMember  = await checkAndParseInputDataAsync(
        await teamMemberResponse,
        dashboardAllApprovalSpeakerTeamMemberScheme,
        `Serveranfrage für die Freigabedaten der Team Member nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für die Freigabedaten der Team Member. throw error(406)`,
    );
    const socialMedia = await checkAndParseInputDataAsync(
        await socialMediaResponse,
        dashboardAllApprovalSocialMediaLinkScheme,
        `Serveranfrage für die Freigabedaten der Social Media Link nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für die Freigabedaten der Social Media Link. throw error(406)`,
    );

    return {
        speaker,
        teamMember,
        socialMedia,
    };
}
