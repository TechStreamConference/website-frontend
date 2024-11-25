import type { Globals } from "./provideTypes";
import type { DashboardRoles, DashboardAllEvents, DashboardAllEventSpeaker, DashboardAllApprovalSpeakerTeamMember, DashboardAllApprovalSocialMediaLink } from "./dashboardProvideTypes";

export type LoadDashboard = { roles: DashboardRoles, globals: Globals }

export type LoadAdminEvents = { allEvents: DashboardAllEvents, allSpeaker: DashboardAllEventSpeaker };

export type LoadAdminApproval = {
    speaker: DashboardAllApprovalSpeakerTeamMember,
    teamMember: DashboardAllApprovalSpeakerTeamMember,
    socialMedia: DashboardAllApprovalSocialMediaLink
};
