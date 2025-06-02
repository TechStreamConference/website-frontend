import type { MenuItem } from 'types/provideTypes';
import { adminApprovalSpeakerTeamMember, speakerEvents, teamMemberEvents, userProfile } from 'menu/dashboardItems';

export const top: MenuItem = {
    name:        'Top',
    url:         '#top',
    description: 'Klicke, um zur aktuellen Hauptseite zurückzukehren',
};

export const mainPage: MenuItem = {
    name:        'Hauptseite',
    url:         '/',
    description: 'Klicke hier, um zur aktuellen Hauptseite zurückzukehren',
};

export const intern: MenuItem = {
    name:        'Intern',
    url:         '/dashboard',
    description: 'Klicke hier, um zum internen Bereich zu navigieren',
};

export const logout: MenuItem = {
    name:        'Abmelden',
    url:         '/logout',
    description: 'Klicke hier zum Abmelden',
};

export const login: MenuItem = {
    name:        'Anmelden',
    url:         '/login',
    description: 'Klicke hier zum Anmelden',
};

export const register: MenuItem = {
    name:        'Registrieren',
    url:         '/register',
    description: 'Klicke hier zum Registrieren',
};

export const imprint: MenuItem = {
    name:        'Impressum',
    url:         '/imprint',
    description: 'Klicke hier, um zum Impressum zu gelangen',
};

export const contact: MenuItem = {
    name:        'Kontakt',
    url:         '/contact',
    description: 'Klicke hier, um mit uns in Kontakt zu treten',
};

export const admin: MenuItem      = {
    name:        'Admin',
    url:         adminApprovalSpeakerTeamMember.url,
    description: 'Klicke hier, um zum Admin-Dashboard zu gelangen',
};
export const teamMember: MenuItem = {
    name:        'Team Member',
    url:         teamMemberEvents.url,
    description: 'Klicke hier, um zum Team-Member-Dashboard zu gelangen',
};
export const speaker: MenuItem    = {
    name:        'Speaker',
    url:         speakerEvents.url,
    description: 'Klicke hier, um zum Speaker-Dashboard zu gelangen',
};
export const user: MenuItem       = {
    name:        'User',
    url:         userProfile.url,
    description: 'Klicke hier, um zum User-Dashboard zu gelangen',
};
