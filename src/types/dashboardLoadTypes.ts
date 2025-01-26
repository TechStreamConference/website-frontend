import type { AllTalkTag, Globals, SimpleError } from './provideTypes';
import type {
    DashboardRoles,
    DashboardAllEvents,
    DashboardAllApprovalSpeakerTeamMembers,
    DashboardAllApprovalSocialMediaLinks,
    DashboardSpeakerTeamMember,
    DashboardAllEventIDs,
    DashboardEventID,
    DashboardAllEventSpeaker,
    DashboardAllSocialMediaLinks,
    DashboardAllSocialMediaLinkTypes,
    DashboardEventApplication,
    DashboardAllTimeSlots,
    DashboardTalkDurationChoices,
    DashboardAllTentativeOrAcceptedTalks,
    DashboardAllPendingTalks,
    DashboardUserData,
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
    speaker: DashboardAllApprovalSpeakerTeamMembers,
    teamMember: DashboardAllApprovalSpeakerTeamMembers,
    socialMedia: DashboardAllApprovalSocialMediaLinks
};

export type LoadSpeakerTeamMemberEvent = {
    allEvents: DashboardAllEventIDs,
    current: DashboardEventID,
    event: DashboardSpeakerTeamMember,
}

export type LoadUserSocials = {
    socials: DashboardAllSocialMediaLinks,
    socialTypes: DashboardAllSocialMediaLinkTypes,
}

export type LoadUserApplication = {
    data: {
              event: DashboardEventApplication,
              speaker: LoadSpeakerTeamMemberEvent,
              socials: LoadUserSocials,
          } | undefined,
    error: SimpleError | undefined
}

export type LoadUserProfile = {
    userData: DashboardUserData,
}

export type LoadSpeakerTalk = {
    allEvents: DashboardAllEventIDs,
    tentativeOrAcceptedTalks: DashboardAllTentativeOrAcceptedTalks,
    pendingTalks: DashboardAllPendingTalks,
    tags: AllTalkTag,
    talkDurations: DashboardTalkDurationChoices,
}
