import type { Year, Globals } from "./provideTypes";

export type LoadYear = { loggedIn: boolean; globals: Globals; year: Year };
export type LoadYearPromise = Promise<LoadYear>;

export type LoadRegister = { loggedIn: boolean; globals: Globals };
export type LoadRegisterPromise = Promise<LoadRegister>;

export type LoadLogin = { loggedIn: boolean; globals: Globals; showLoginMessage: boolean; };
export type LoadLoginPromise = Promise<LoadLogin>;

export type LoadImprint = { loggedIn: boolean; globals: Globals; };
export type LoadImprintPromise = Promise<LoadImprint>;
