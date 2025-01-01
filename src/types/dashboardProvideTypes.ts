import { z } from 'zod';

export const dashboardRolesScheme = z.object({
                                                 user_id:        z.number(),
                                                 email:          z.string(),
                                                 is_speaker:     z.boolean(),
                                                 is_team_member: z.boolean(),
                                                 is_admin:       z.boolean(),
                                             });
export type DashboardRoles = z.infer<typeof dashboardRolesScheme>;

export const dashboardEventIDScheme = z.object({
                                                   event_id: z.number(),
                                                   title:    z.string(),
                                               });
export type DashboardEventID = z.infer<typeof dashboardEventIDScheme>;

export const dashboardAllEventIDScheme = z.array(dashboardEventIDScheme);
export type DashboardAllEventID = z.infer<typeof dashboardAllEventIDScheme>;

export const dashboardSpeakerTeamMemberScheme = z.object({
                                                             id:                z.number(),
                                                             user_id:           z.number(),
                                                             name:              z.string(),
                                                             short_bio:         z.string(),
                                                             bio:               z.string(),
                                                             photo:             z.string(),
                                                             visible_from:      z.string().nullable(),
                                                             is_approved:       z.boolean(),
                                                             requested_changes: z.string().nullable(),
                                                         });
export type DashboardSpeakerTeamMember = z.infer<typeof dashboardSpeakerTeamMemberScheme>;

export const dashboardEventScheme = z.object({
                                                 id:                    z.number(),
                                                 title:                 z.string(),
                                                 subtitle:              z.string(),
                                                 start_date:            z.string(),
                                                 end_date:              z.string(),
                                                 discord_url:           z.string()
                                                                         .nullable()
                                                                         .transform((val) => val ?? ''),
                                                 twitch_url:            z.string()
                                                                         .nullable()
                                                                         .transform((val) => val ?? ''),
                                                 presskit_url:          z.string()
                                                                         .nullable()
                                                                         .transform((val) => val ?? ''),
                                                 trailer_youtube_id:    z.string()
                                                                         .nullable()
                                                                         .transform((val) => val ?? ''),
                                                 description_headline:  z.string(),
                                                 description:           z.string(),
                                                 schedule_visible_from: z.string()
                                                                         .nullable()
                                                                         .transform((val) => val ?? ''),
                                                 publish_date:          z.string()
                                                                         .nullable()
                                                                         .transform((val) => val ?? ''),
                                                 call_for_papers_start: z.string()
                                                                         .nullable()
                                                                         .transform((val) => val ?? ''),
                                                 call_for_papers_end:   z.string()
                                                                         .nullable()
                                                                         .transform((val) => val ?? ''),

                                             });
export type DashboardEvent = z.infer<typeof dashboardEventScheme>;

export const dashboardAllEventsScheme = z.array(dashboardEventScheme);
export type DashboardAllEvents = z.infer<typeof dashboardAllEventsScheme>;


export const dashboardEventSpeakerScheme = z.object({
                                                        id:           z.number(),
                                                        name:         z.string(),
                                                        visible_from: z.string()
                                                                       .nullable()
                                                                       .transform((val) => val ?? ''),
                                                    });
export type DashboardEventSpeaker = z.infer<typeof dashboardEventSpeakerScheme>;

export const dashboardAllEventSpeakerScheme = z.array(dashboardEventSpeakerScheme);
export type DashboardAllEventSpeaker = z.infer<typeof dashboardAllEventSpeakerScheme>;

export const dashboardApprovalSpeakerTeamMemberScheme = z.object({
                                                                     id:                z.number(),
                                                                     name:              z.string(),
                                                                     short_bio:         z.string(),
                                                                     bio:               z.string(),
                                                                     photo:             z.string(),
                                                                     requested_changes: z.string()
                                                                                         .nullable()
                                                                                         .transform((val) => val ?? ''),
                                                                     account:           z.object({
                                                                                                     username: z.string(),
                                                                                                 }),
                                                                     event:             z.object({
                                                                                                     title: z.string(),
                                                                                                 }),
                                                                     diff:              z.array(z.string()).nullable(),
                                                                 });
export type DashboardApprovalSpeakerTeamMember = z.infer<typeof dashboardApprovalSpeakerTeamMemberScheme>;

export const dashboardAllApprovalSpeakerTeamMemberScheme = z.array(dashboardApprovalSpeakerTeamMemberScheme);
export type DashboardAllApprovalSpeakerTeamMember = z.infer<typeof dashboardAllApprovalSpeakerTeamMemberScheme>;

export const dashboardApprovalSocialMediaLinkScheme = z.object({
                                                                   id:                z.number(),
                                                                   name:              z.string(),
                                                                   url:               z.string(),
                                                                   requested_changes: z.string()
                                                                                       .nullable()
                                                                                       .transform((val) => val ?? ''),
                                                                   account:           z.object({
                                                                                                   username: z.string(),
                                                                                               }),
                                                               });
export type DashboardApprovalSocialMediaLink = z.infer<typeof dashboardApprovalSocialMediaLinkScheme>;

export const dashboardAllApprovalSocialMediaLinkScheme = z.array(dashboardApprovalSocialMediaLinkScheme);
export type DashboardAllApprovalSocialMediaLink = z.infer<typeof dashboardAllApprovalSocialMediaLinkScheme>;

export const dashboardSocialMediaLinkScheme = z.object({
                                                           id:                   z.number(),
                                                           user_id:              z.number(),
                                                           social_media_type_id: z.number(),
                                                           name:                 z.string(),
                                                           url:                  z.string(),
                                                           approved:             z.boolean(),
                                                           requested_changes:    z.string().nullable(),
                                                       });
export type DashboardSocialMediaLink = z.infer<typeof dashboardSocialMediaLinkScheme>;

export const dashboardAllSocialMediaLinkScheme = z.array(dashboardSocialMediaLinkScheme);
export type DashboardAllSocialMediaLink = z.infer<typeof dashboardAllSocialMediaLinkScheme>;

export const dashboardSocialMediaLinkTypeScheme = z.object({
                                                               id:   z.number(),
                                                               name: z.string(),
                                                           });
export type DashboardSocialMediaLinkType = z.infer<typeof dashboardSocialMediaLinkTypeScheme>;

export const dashboardAllSocialMediaLinkTypeScheme = z.array(dashboardSocialMediaLinkTypeScheme);
export type DashboardAllSocialMediaLinkType = z.infer<typeof dashboardAllSocialMediaLinkTypeScheme>;

export const dashboardEventApplicationScheme = z.object({
                                                            id:                    z.number(),
                                                            title:                 z.string(),
                                                            subtitle:              z.string(),
                                                            start_date:            z.string(),
                                                            end_date:              z.string(),
                                                            call_for_papers_start: z.string(),
                                                            call_for_papers_end:   z.string(),
                                                        });
export type DashboardEventApplication = z.infer<typeof dashboardEventApplicationScheme>;
