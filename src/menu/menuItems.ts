import type { MenuItem } from "types/provideTypes";

export const start: MenuItem =
{
    name: 'Start',
    url: '/',
    description: 'Klicke, um zur aktuellen Hauptseite zurückzukehren'
}

export const intern: MenuItem = {
    name: 'Intern',
    url: '/backend',
    description: "Klicke, um zum internen Bereich zu navigieren"
}

export const logout: MenuItem = {
    name: 'Abmelden',
    url: '/logout',
    description: 'Klicke, um zum Abmelden'
}

export const login: MenuItem = {
    name: 'Anmelden',
    url: '/login',
    description: 'Klicke, um zum Anmelden'
}

export const register: MenuItem = {
    name: 'Registrieren',
    url: '/register',
    description: 'Klicke, zum registrieren'
}

export const imprint: MenuItem = {
    name: 'Impressum',
    url: '/imprint',
    description: 'Klicke, um zum impressum zu gelangen'
}
