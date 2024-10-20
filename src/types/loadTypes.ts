import type { Year, Globals, Roles } from "./provideTypes";

export type LoadYear = { loggedIn: boolean; globals: Globals; year: Year };

export type LoadRegister = { loggedIn: boolean; globals: Globals };

export type LoadLogin = { loggedIn: boolean; globals: Globals; showLoginMessage: boolean; };

export type LoadImprint = { loggedIn: boolean; globals: Globals; };

export type LoadUser = { roles: Roles };

export type LoadSpeaker = { roles: Roles };

export type LoadTeamMember = { roles: Roles };

export type LoadAdmin = { roles: Roles };
