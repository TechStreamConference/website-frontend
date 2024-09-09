export type LoadYear = { currentYear: number; displayedYear: number; loggedIn: boolean };
export type LoadYearPromise = Promise<LoadYear>;

export type LoadRegister = { currentYear: number };
export type LoadRegisterPromise = Promise<LoadRegister>;

export type LoadLogin = { currentYear: number };
export type LoadLoginPromise = Promise<LoadLogin>;
