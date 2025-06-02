import type {
    DashboardAllApprovalSocialMediaLinks,
    DashboardAllApprovalSpeakerTeamMembers,
} from 'types/dashboardProvideTypes';

export function getUserIds(
    speaker: DashboardAllApprovalSpeakerTeamMembers,
    teamMember: DashboardAllApprovalSpeakerTeamMembers,
    socialMedia: DashboardAllApprovalSocialMediaLinks,
): number[] {
    const ids = new Set<number>();

    speaker.forEach(speaker => ids.add(speaker.user_id));
    teamMember.forEach(teamMember => ids.add(teamMember.user_id));
    socialMedia.forEach(socialMedia => ids.add(socialMedia.user_id));

    return [...ids].sort((a, b) => a - b);
}
