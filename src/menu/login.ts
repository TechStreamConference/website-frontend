import type { Menu } from "types/provideTypes";

export const loginHeaderOut: Menu = [
    {
        name: 'Start',
        url: '/',
        description: 'Klicke hier um zur aktuellen Hauptseite zurückzukehren'
    },
    {
        name: 'Registrieren',
        url: '/register',
        description: 'Klicke hier zum registrieren'
    },
];

export const loginFooterOut: Menu = [
    {
        name: 'Registrieren',
        url: '/register',
        description: 'Klicke hier zum registrieren'
    },
    {
        name: 'Impressum',
        url: '/impressum',
        description: 'Klicke hier um zum impressum zu gelangen'
    },
];
