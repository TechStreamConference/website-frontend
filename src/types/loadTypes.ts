import type {Year, Globals} from './provideTypes';

export type LoadYear = {
    year: Year
};

export type LoadRegister = {
    loggedIn: boolean;
    globals: Globals;
    token: string | null;
};

export type LoadLogin = {
    loggedIn: boolean;
    globals: Globals;
    showLoginMessage: boolean;
};

export type LoadImprint = {
    loggedIn: boolean;
    globals: Globals;
};

export type LoadContact = {
    loggedIn: boolean;
    globals: Globals;
};

export type LoadVerifyEmail = {
    success: boolean | undefined,
    globals: Globals;
};

export type LoadResetPassword = {
    globals: Globals;
    token: string;
}

export type LoadFooter = {
    loggedIn: boolean;
    globals: Globals;
}
