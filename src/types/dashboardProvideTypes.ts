import { z } from 'zod'

export const dashboardRolesScheme = z.object({
    user_id: z.number(),
    email: z.string(),
    is_speaker: z.boolean(),
    is_team_member: z.boolean(),
    is_admin: z.boolean(),
})
export type DashboardRoles = z.infer<typeof dashboardRolesScheme>;

export const adminAllEventsScheme = z.array(z.number());
export type AdminAllEvents = z.infer<typeof adminAllEventsScheme>;

export const adminEventScheme = z.object({});
export type AdminEvent = z.infer<typeof adminEventScheme>;
