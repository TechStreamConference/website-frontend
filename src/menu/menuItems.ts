import type { MenuItem } from "types/provideTypes";

export const mainPage: MenuItem =
{
    name: 'Hauptseite',
    url: '/',
    description: 'Klicke, um zur aktuellen Hauptseite zurückzukehren'
}

export const intern: MenuItem = {
    name: 'Intern',
    url: '/dashboard',
    description: "Klicke, um zum internen Bereich zu navigieren"
}

export const logout: MenuItem = {
    name: 'Abmelden',
    url: '/logout',
    description: 'Klicke zum Abmelden'
}

export const login: MenuItem = {
    name: 'Anmelden',
    url: '/login',
    description: 'Klicke zum Anmelden'
}

export const register: MenuItem = {
    name: 'Registrieren',
    url: '/register',
    description: 'Klicke zum Registrieren'
}

export const imprint: MenuItem = {
    name: 'Impressum',
    url: '/imprint',
    description: 'Klicke, um zum Impressum zu gelangen'
}

export const admin: MenuItem = {
    name: 'Admin',
    url: '/dashboard/admin',
    description: 'Klicke, um zum Admin Dashboard zu gelangen'
}

export const teamMember: MenuItem = {
    name: 'Team Member',
    url: '/dashboard/team-member',
    description: 'Klicke, um zum Team Member Dashboard zu gelangen'
}

export const speaker: MenuItem = {
    name: 'Speaker',
    url: '/dashboard/speaker',
    description: 'Klicke, um zum Speaker Dashboard zu gelangen'
}

export const user: MenuItem = {
    name: 'User',
    url: '/dashboard/user',
    description: 'Klicke, um zum User Dashboard zu gelangen'
}
