import type { Globals } from "./provideTypes";
import type {
    DashboardRoles,
    DashboardAllEvents,
    DashboardAllApprovalSpeakerTeamMember,
    DashboardAllApprovalSocialMediaLink,
    DashboardSpeakerTeamMemberScheme,
    DashboardAllEventID,
    DashboardEventID,
    DashboardAllEventSpeaker,
} from "./dashboardProvideTypes";

export type LoadDashboard = { roles: DashboardRoles, globals: Globals }

export type LoadAdminEvents = { allEvents: DashboardAllEvents, allSpeaker: DashboardAllEventSpeaker };

export type LoadAdminApproval = {
    speaker: DashboardAllApprovalSpeakerTeamMember,
    teamMember: DashboardAllApprovalSpeakerTeamMember,
    socialMedia: DashboardAllApprovalSocialMediaLink
};

export type LoadSpeakerTeamMemberEvent = {
    allEvents: DashboardAllEventID,
    current: DashboardEventID,
    event: DashboardSpeakerTeamMemberScheme,
}
