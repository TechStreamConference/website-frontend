export type LoadYear = { currentYear: number; displayedYear: number; loggedIn: boolean };
export type LoadYearPromise = Promise<LoadYear>;

export type LoadRegister = { loggedIn: boolean; currentYear: number };
export type LoadRegisterPromise = Promise<LoadRegister>;

export type LoadLogin = { loggedIn: boolean; currentYear: number };
export type LoadLoginPromise = Promise<LoadLogin>;

export type LoadBackend = {};
export type LoadBackendPromise = Promise<LoadBackend>;
