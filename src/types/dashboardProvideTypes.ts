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
    discord_url: z.string().nullable(),
    twitch_url: z.string().nullable(),
    presskit_url: z.string().nullable(),
    trailer_youtube_id: z.string().nullable(),
    description_headline: z.string(),
    description: z.string(),
    schedule_visible_from: z.string().nullable(),
    publish_date: z.string().nullable(),
})
export type DashboardEvent = z.infer<typeof dashboardEventScheme>;

export const dashboardAllEventsScheme = z.array(dashboardEventScheme);
export type DashboardAllEvents = z.infer<typeof dashboardAllEventsScheme>;
