import { z } from 'zod'

export const dashboardRolesScheme = z.object({
    user_id: z.number(),
    email: z.string(),
    is_speaker: z.boolean(),
    is_team_member: z.boolean(),
    is_admin: z.boolean(),
})
export type DashboardRoles = z.infer<typeof dashboardRolesScheme>;

export const adminGlobalScheme = z.object({
    footer_text: z.string(),
})
export type AdminGlobal = z.infer<typeof adminGlobalScheme>;
