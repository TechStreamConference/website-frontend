import type { Year, Globals } from "./provideTypes";

export type LoadYear = { loggedIn: boolean; globals: Globals; year: Year };

export type LoadRegister = { loggedIn: boolean; globals: Globals };

export type LoadLogin = { loggedIn: boolean; globals: Globals; showLoginMessage: boolean; };

export type LoadImprint = { loggedIn: boolean; globals: Globals; };

export type LoadVerifyEmail = { success: boolean | undefined, globals: Globals; };
