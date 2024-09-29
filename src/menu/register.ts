import type { Menu } from "types/provideTypes"

export const headerOut: Menu = [
    {
        name: 'Start',
        url: '/',
        description: 'Klicke hier um zur aktuellen Hauptseite zurückzukehren'
    },
    {
        name: 'Anmelden',
        url: '/login',
        description: 'Klicke hier zum anmelden'
    },
];

export const footerOut: Menu = [
    {
        name: 'Anmelden',
        url: '/login',
        description: 'Klicke hier zum anmelden'
    },
    {
        name: 'Impressum',
        url: '/imprint',
        description: 'Klicke hier um zum impressum zu gelangen'
    },
];
