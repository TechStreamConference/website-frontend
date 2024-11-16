import type { Globals } from "./provideTypes";
import type { DashboardRoles, DashboardAllEvents, DashboardAllEventSpeaker } from "./dashboardProvideTypes";

export type LoadDashboard = { roles: DashboardRoles, globals: Globals }

export type LoadAdminEvents = { allEvents: DashboardAllEvents, allSpeaker: DashboardAllEventSpeaker };
