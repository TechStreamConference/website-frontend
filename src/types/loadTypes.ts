import type { Year, Globals, Roles, Admin } from "./provideTypes";

export type LoadYear = { loggedIn: boolean; globals: Globals; year: Year };

export type LoadRegister = { loggedIn: boolean; globals: Globals };

export type LoadLogin = { loggedIn: boolean; globals: Globals; showLoginMessage: boolean; };

export type LoadImprint = { loggedIn: boolean; globals: Globals; };

export type LoadUser = { roles: Roles, globals: Globals };

export type LoadSpeaker = { roles: Roles, globals: Globals };

export type LoadTeamMember = { roles: Roles, globals: Globals };

export type LoadAdmin = { roles: Roles, globals: Globals, admin: Admin };
