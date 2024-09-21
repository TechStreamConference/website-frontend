export type LoadYear = { loggedIn: boolean; currentYear: number; displayedYear: number; };
export type LoadYearPromise = Promise<LoadYear>;

export type LoadRegister = { loggedIn: boolean; currentYear: number };
export type LoadRegisterPromise = Promise<LoadRegister>;

export type LoadLogin = { loggedIn: boolean; currentYear: number; showLoginMessage: boolean; };
export type LoadLoginPromise = Promise<LoadLogin>;

export type LoadBackend = {};
export type LoadBackendPromise = Promise<LoadBackend>;

export type LoadImpressum = { loggedIn: boolean; currentYear: number; };
export type LoadImpressumPromise = Promise<LoadImpressum>;
