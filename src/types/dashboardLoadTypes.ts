import type { AllTalkTag, Globals, SimpleError } from './provideTypes';
import type { Clone } from 'helper/clone';
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
    DashboardAllTalk,
    DashboardTalk,
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
    allTalks: DashboardAllTalk,
    currentTalk: Clone<DashboardTalk> | undefined,
    tags: AllTalkTag,
    talkDurations: DashboardTalkDurationChoices,
}
