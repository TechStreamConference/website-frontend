import { z } from 'zod'

export const dashboardRolesScheme = z.object({
    user_id: z.number(),
    email: z.string(),
    is_speaker: z.boolean(),
    is_team_member: z.boolean(),
    is_admin: z.boolean(),
})
export type DashboardRoles = z.infer<typeof dashboardRolesScheme>;

export const dashboardEventScheme = z.object({
    id: z.number(),
    title: z.string(),
    subtitle: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    discord_url: z.string().nullable().transform((val) => val ?? ""),
    twitch_url: z.string().nullable().transform((val) => val ?? ""),
    presskit_url: z.string().nullable().transform((val) => val ?? ""),
    trailer_youtube_id: z.string().nullable().transform((val) => val ?? ""),
    description_headline: z.string(),
    description: z.string(),
    schedule_visible_from: z.string().nullable().transform((val) => val ?? ""),
    publish_date: z.string().nullable().transform((val) => val ?? ""),
})
export type DashboardEvent = z.infer<typeof dashboardEventScheme>;

export const dashboardAllEventsScheme = z.array(dashboardEventScheme);
export type DashboardAllEvents = z.infer<typeof dashboardAllEventsScheme>;


export const dashboardEventSpeakerScheme = z.object({
    id: z.number(),
    name: z.string(),
    visible_from: z.string().nullable().transform((val) => val ?? ""),
})
export type DashboardEventSpeaker = z.infer<typeof dashboardEventSpeakerScheme>;

export const dashboardAllEventSpeakerScheme = z.array(dashboardEventSpeakerScheme);
export type DashboardAllEventSpeaker = z.infer<typeof dashboardAllEventSpeakerScheme>;
