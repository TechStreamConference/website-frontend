import type { Globals } from "./provideTypes";
import type { DashboardRoles, AdminGlobal } from "./dashboardProvideTypes";

export type LoadDashboard = { roles: DashboardRoles, globals: Globals }

export type LoadAdminGlobal = { admin: AdminGlobal };
