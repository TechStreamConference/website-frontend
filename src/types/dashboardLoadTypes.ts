import type { Globals, SimpleError } from './provideTypes';
import type {
    DashboardRoles,
    DashboardAllEvents,
    DashboardAllApprovalSpeakerTeamMember,
    DashboardAllApprovalSocialMediaLink,
    DashboardSpeakerTeamMember,
    DashboardAllEventID,
    DashboardEventID,
    DashboardAllEventSpeaker,
    DashboardAllSocialMediaLink,
    DashboardAllSocialMediaLinkType,
    DashboardEventPropagation,
} from './dashboardProvideTypes';

export type LoadDashboard = {
    roles: DashboardRoles,
    globals: Globals
}

export type LoadAdminEvents = {
    allEvents: DashboardAllEvents,
    allSpeaker: DashboardAllEventSpeaker
};

export type LoadAdminApproval = {
    speaker: DashboardAllApprovalSpeakerTeamMember,
    teamMember: DashboardAllApprovalSpeakerTeamMember,
    socialMedia: DashboardAllApprovalSocialMediaLink
};

export type LoadSpeakerTeamMemberEvent = {
    allEvents: DashboardAllEventID,
    current: DashboardEventID,
    event: DashboardSpeakerTeamMember,
}

export type LoadUserSocials = {
    socials: DashboardAllSocialMediaLink,
    socialTypes: DashboardAllSocialMediaLinkType,
}

export type LoadUserApplication = {
    data: {
              event: DashboardEventPropagation,
              speaker: LoadSpeakerTeamMemberEvent,
              socials: LoadUserSocials,
          } | undefined,
    error: SimpleError | undefined
}
