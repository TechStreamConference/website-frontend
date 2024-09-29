import type { Menu } from "types/provideTypes";

export const headerOut: Menu = [
    {
        name: 'Start',
        url: '/',
        description: 'Klicke hier, um zur aktuellen Hauptseite zurückzukehren'
    },
    {
        name: 'Anmelden',
        url: '/login',
        description: 'Klicke hier zum Anmelden'
    },
    {
        name: 'Registrieren',
        url: '/register',
        description: 'Klicke hier zum Registrieren'
    },
];

export const headerIn: Menu = [
    {
        name: 'Start',
        url: '/',
        description: 'Klicke hier um zur aktuellen Hauptseite zurückzukehren'
    },
    {
        name: 'Abmelden',
        url: '/logout',
        description: 'Klicke hier zum abmelden'
    },
];


export const footerOut: Menu = [
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
    {
        name: 'Registrieren',
        url: '/register',
        description: 'Klicke hier zum registrieren'
    },
];

export const footerIn: Menu = [
    {
        name: 'Start',
        url: '/',
        description: 'Klicke hier um zur aktuellen Hauptseite zurückzukehren'
    },
    {
        name: 'Intern',
        url: '/intern',
        description: 'Klicke hier um in den internen Bereich zu gelangen'
    },
];
