import type { Globals } from "./provideTypes";
import type { DashboardRoles, DashboardAllEvents } from "./dashboardProvideTypes";

export type LoadDashboard = { roles: DashboardRoles, globals: Globals }

export type LoadAdminEvents = { allEvents: DashboardAllEvents };
