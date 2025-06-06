import {z} from 'zod';

export const dashboard_roles_scheme = z.object({
    user_id: z.number(),
    username: z.string(),
    email: z.string(),
    is_speaker: z.boolean(),
    is_team_member: z.boolean(),
    is_admin: z.boolean(),
});
export type DashboardRoles = z.infer<typeof dashboard_roles_scheme>;

export const dashboard_event_id_scheme = z.object({
    event_id: z.number(),
    title: z.string(),
});
export type DashboardEventID = z.infer<typeof dashboard_event_id_scheme>;

export const dashboard_all_event_id_scheme = z.array(dashboard_event_id_scheme);
export type DashboardAllEventIDs = z.infer<typeof dashboard_all_event_id_scheme>;

export const dashboard_person_scheme = z.object({
    id: z.number(),
    user_id: z.number(),
    name: z.string(),
    short_bio: z.string(),
    bio: z.string(),
    photo: z.string(),
    visible_from: z.string().nullable(),
});
export type DashboardPerson = z.infer<typeof dashboard_person_scheme>;
export const dashboard_all_persons_scheme = z.array(dashboard_person_scheme);
export type DashboardAllPersons = z.infer<typeof dashboard_all_persons_scheme>;

export const dashboard_speaker_team_member_scheme = z.object({
    id: z.number(),
    user_id: z.number(),
    name: z.string(),
    short_bio: z.string(),
    bio: z.string(),
    photo: z.string(),
    visible_from: z.string().nullable(),
    is_approved: z.boolean(),
    requested_changes: z.string().nullable(),
});
export type DashboardSpeakerTeamMember = z.infer<typeof dashboard_speaker_team_member_scheme>;

export const dashboard_event_scheme = z.object({
    id: z.number(),
    title: z.string(),
    subtitle: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    discord_url: z.string()
        .nullable()
        .transform((val) => val ?? ''),
    twitch_url: z.string()
        .nullable()
        .transform((val) => val ?? ''),
    presskit_url: z.string()
        .nullable()
        .transform((val) => val ?? ''),
    trailer_youtube_id: z.string()
        .nullable()
        .transform((val) => val ?? ''),
    description_headline: z.string(),
    description: z.string(),
    schedule_visible_from: z.string()
        .nullable()
        .transform((val) => val ?? ''),
    publish_date: z.string()
        .nullable()
        .transform((val) => val ?? ''),
    call_for_papers_start: z.string()
        .nullable()
        .transform((val) => val ?? ''),
    call_for_papers_end: z.string()
        .nullable()
        .transform((val) => val ?? ''),
    frontpage_date: z.string()
        .nullable()
        .transform((val) => val ?? ''),

});
export type DashboardEvent = z.infer<typeof dashboard_event_scheme>;

export const dashboard_all_events_scheme = z.array(dashboard_event_scheme);
export type DashboardAllEvents = z.infer<typeof dashboard_all_events_scheme>;


export const dashboard_event_speaker_scheme = z.object({
    id: z.number(),
    name: z.string(),
    visible_from: z.string()
        .nullable()
        .transform((val) => val ?? ''),
});
export type DashboardEventSpeaker = z.infer<typeof dashboard_event_speaker_scheme>;

export const dashboard_all_event_speaker_scheme = z.array(dashboard_event_speaker_scheme);
export type DashboardAllEventSpeaker = z.infer<typeof dashboard_all_event_speaker_scheme>;

export const dashboard_approval_speaker_team_member_scheme = z.object({
    id: z.number(),
    user_id: z.number(),
    event_id: z.number(),
    name: z.string(),
    short_bio: z.string(),
    bio: z.string(),
    photo: z.string(),
    requested_changes: z.string()
        .nullable()
        .transform((val) => val ?? ''),
    account: z.object({
        username: z.string(),
    }),
    event: z.object({
        title: z.string(),
    }),
    diff: z.array(z.string()).nullable(),
    can_reject: z.boolean()
        .optional()
        .transform((val) => val
            ?? false),
});
export type DashboardApprovalSpeakerTeamMember = z.infer<typeof dashboard_approval_speaker_team_member_scheme>;

export const dashboard_all_approval_speaker_team_member_scheme = z.array(dashboard_approval_speaker_team_member_scheme);
export type DashboardAllApprovalSpeakerTeamMembers = z.infer<typeof dashboard_all_approval_speaker_team_member_scheme>;

export const dashboard_approval_social_media_link_scheme = z.object({
    id: z.number(),
    user_id: z.number(),
    name: z.string(),
    url: z.string(),
    requested_changes: z.string()
        .nullable()
        .transform((val) => val ?? ''),
    account: z.object({
        username: z.string(),
    }),
});
export type DashboardApprovalSocialMediaLink = z.infer<typeof dashboard_approval_social_media_link_scheme>;

export const dashboard_all_approval_social_media_link_scheme = z.array(dashboard_approval_social_media_link_scheme);
export type DashboardAllApprovalSocialMediaLinks = z.infer<typeof dashboard_all_approval_social_media_link_scheme>;

export const dashboard_social_media_link_scheme = z.object({
    id: z.number(),
    user_id: z.number(),
    social_media_type_id: z.number(),
    name: z.string(),
    url: z.string(),
    approved: z.boolean(),
    requested_changes: z.string().nullable(),
});
export type DashboardSocialMediaLink = z.infer<typeof dashboard_social_media_link_scheme>;

export const dashboard_all_social_media_link_scheme = z.array(dashboard_social_media_link_scheme);
export type DashboardAllSocialMediaLinks = z.infer<typeof dashboard_all_social_media_link_scheme>;

export const dashboard_social_media_link_type_scheme = z.object({
    id: z.number(),
    name: z.string(),
});
export type DashboardSocialMediaLinkType = z.infer<typeof dashboard_social_media_link_type_scheme>;

export const dashboard_all_social_media_link_type_scheme = z.array(dashboard_social_media_link_type_scheme);
export type DashboardAllSocialMediaLinkTypes = z.infer<typeof dashboard_all_social_media_link_type_scheme>;

export const dashboard_event_application_scheme = z.object({
    id: z.number(),
    title: z.string(),
    subtitle: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    call_for_papers_start: z.string(),
    call_for_papers_end: z.string(),
});
export type DashboardEventApplication = z.infer<typeof dashboard_event_application_scheme>;


export const dashboard_time_slot_scheme = z.object({
    id: z.number(),
    event_id: z.number(),
    start_time: z.string(),
    duration: z.number(),
    is_occupied: z.boolean()
        .optional()
        .transform(x => x ?? false),
    is_special: z.boolean(),
});
export type DashboardTimeSlot = z.infer<typeof dashboard_time_slot_scheme>;
export const dashboard_all_time_slots_scheme = z.array(dashboard_time_slot_scheme);
export type DashboardAllTimeSlots = z.infer<typeof dashboard_all_time_slots_scheme>;

export const dashboard_talk_duration_choices_scheme = z.array(z.number());
export type DashboardTalkDurationChoices = z.infer<typeof dashboard_talk_duration_choices_scheme>

export const dashboard_talk_tag_scheme = z.object({
    id: z.number(),
    color_index: z.number(),
    text: z.string(),
});
export type DashboardTalkTag = z.infer<typeof dashboard_talk_tag_scheme>;
export const dashboard_all_talk_tag_scheme = z.array(dashboard_talk_tag_scheme);
export type DashboardAllTalkTag = z.infer<typeof dashboard_all_talk_tag_scheme>;

export const dashboard_tentative_or_accepted_talk_scheme = z.object({
    id: z.number(),
    event_id: z.number(),
    title: z.string(),
    description: z.string(),
    notes: z.string()
        .nullable()
        .transform(x => x ?? ''),
    requested_changes: z.string().nullable(),
    time_slot_accepted: z.boolean(),
    tags: dashboard_all_talk_tag_scheme,
    possible_durations: dashboard_talk_duration_choices_scheme,
    suggested_time_slot: dashboard_time_slot_scheme.nullable(),
    speaker: dashboard_speaker_team_member_scheme,
    guests: dashboard_all_persons_scheme,
});
export type DashboardTentativeOrAcceptedTalk = z.infer<typeof dashboard_tentative_or_accepted_talk_scheme>;
export const dashboard_all_tentative_or_accepted_talk_scheme = z.array(dashboard_tentative_or_accepted_talk_scheme);
export type DashboardAllTentativeOrAcceptedTalks = z.infer<typeof dashboard_all_tentative_or_accepted_talk_scheme>;

export const dashboardPendingTalkScheme = z.object({
    id: z.number(),
    event_id: z.number(),
    title: z.string(),
    description: z.string(),
    notes: z.string()
        .nullable()
        .transform(x => x ?? ''),
    requested_changes: z.string()
        .nullable()
        .transform(x => x ?? ''),
    tags: dashboard_all_talk_tag_scheme,
    possible_durations: dashboard_talk_duration_choices_scheme,
    speaker: dashboard_speaker_team_member_scheme,
});
export type DashboardPendingTalk = z.infer<typeof dashboardPendingTalkScheme>;
export const dashboard_all_pending_talk_scheme = z.array(dashboardPendingTalkScheme);
export type DashboardAllPendingTalks = z.infer<typeof dashboard_all_pending_talk_scheme>;


export const dashboard_vdo_link_scheme = z.object({
    name: z.string(),
    push_cam: z.string(),
    push_screen: z.string(),
    view_cam: z.string(),
    view_screen: z.string(),
});
export type DashboardVdoLink = z.infer<typeof dashboard_vdo_link_scheme>;
export const dashboard_admin_vdo_link_scheme = z.object({
    director: z.string(),
    speakers: z.array(dashboard_vdo_link_scheme),
});
export type DashboardAdminVdoLink = z.infer<typeof dashboard_admin_vdo_link_scheme>;
