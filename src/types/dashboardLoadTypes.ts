import type { Globals } from "./provideTypes";
import type { DashboardRoles, AdminAllEvents, AdminEvent } from "./dashboardProvideTypes";

export type LoadDashboard = { roles: DashboardRoles, globals: Globals }

export type LoadAdminEvents = { allEvents: AdminAllEvents, event: AdminEvent };
