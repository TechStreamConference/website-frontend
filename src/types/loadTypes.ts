import type { Year, Globals, Roles, AdminGlobal } from "./provideTypes";

export type LoadYear = { loggedIn: boolean; globals: Globals; year: Year };

export type LoadRegister = { loggedIn: boolean; globals: Globals };

export type LoadLogin = { loggedIn: boolean; globals: Globals; showLoginMessage: boolean; };

export type LoadImprint = { loggedIn: boolean; globals: Globals; };

export type LoadDashboard = { roles: Roles, globals: Globals }

export type LoadAdminGlobal = { admin: AdminGlobal };
