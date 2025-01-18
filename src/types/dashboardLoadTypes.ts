import type { AllTalkTag, Globals, SimpleError } from './provideTypes';
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
    DashboardEventApplication,
    DashboardAllTimeSlots,
    DashboardTalkDurationChoices,
    DashboardAllTentativeOrAcceptedTalk,
    DashboardAllPendingTalk,
} from './dashboardProvideTypes';

export type LoadDashboard = {
    roles: DashboardRoles,
    globals: Globals
}

export type LoadAdminEvents = {
    allEvents: DashboardAllEvents,
    allSpeaker: DashboardAllEventSpeaker
};

export type LoadAdminTimeSlots = {
    allEvents: DashboardAllEvents,
    currentSlots: DashboardAllTimeSlots,
    talkDurationChoices: DashboardTalkDurationChoices,
    currentEventID: number;
}

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
              event: DashboardEventApplication,
              speaker: LoadSpeakerTeamMemberEvent,
              socials: LoadUserSocials,
          } | undefined,
    error: SimpleError | undefined
}

export type LoadSpeakerTalk = {
    allEvents: DashboardAllEventID,
    tentativeOrAcceptedTalk: DashboardAllTentativeOrAcceptedTalk,
    pendingTalks: DashboardAllPendingTalk,
    tags: AllTalkTag,
    talkDurations: DashboardTalkDurationChoices,
}
