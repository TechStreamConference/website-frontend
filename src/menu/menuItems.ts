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
    url: '/dashboard/admin/globals',
    description: 'Klicke, um zum Admin-Dashboard zu gelangen',
}

export const teamMember: MenuItem = {
    name: 'Team Member',
    url: '/dashboard/team-member/events',
    description: 'Klicke, um zum Team-Member-Dashboard zu gelangen',
}

export const speaker: MenuItem = {
    name: 'Speaker',
    url: '/dashboard/speaker/events',
    description: 'Klicke, um zum Speaker-Dashboard zu gelangen',
}

export const user: MenuItem = {
    name: 'User',
    url: '/dashboard/user/newsletter',
    description: 'Klicke, um zum User-Dashboard zu gelangen',
}

export const adminGlobals: MenuItem = {
    name: 'Globals',
    url: '/dashboard/admin/globals',
    description: 'Klicke hier, um zu den globalen Einstellungen im Admin-Dashboard zu gelangen.'
};
export const adminEvents: MenuItem = {
    name: 'Events',
    url: '/dashboard/admin/events',
    description: 'Klicke hier, um zu den Event Einstellungen zu gelangen.'
};
export const adminApproval: MenuItem = {
    name: 'Freigabe',
    url: '/dashboard/admin/approval',
    description: 'Klicke hier, um ausstehende Freigaben zu bearbeiten.'
};

export const speakerEvents: MenuItem = {
    name: 'Events',
    url: '/dashboard/speaker/events',
    description: 'Klicke hier um zu den Event spezifischen Einstellungen zu gelangen.'
};
export const speakerSocialMedia: MenuItem = {
    name: 'Social Media',
    url: '/dashboard/speaker/socials',
    description: 'Klicke hier um zu den Social Media Einstellungen zu gelangen.'
};
export const speakerCallForPapers: MenuItem = {
    name: 'Bewerbung',
    url: '/dashboard/speaker/call-for-papers',
    description: 'Klicke hier um dich als Speaker für das aktuelle Event zu bewerben.'
};

export const teamMemberEvents: MenuItem = {
    name: 'Events',
    url: '/dashboard/team-member/events',
    description: 'Klicke hier um zu den Event spezifischen Einstellungen zu gelangen.'
};
export const teamMemberSocialMedia: MenuItem = {
    name: 'Social Media',
    url: '/dashboard/team-member/social-media',
    description: 'Klicke hier um zu den Social Media Einstellungen zu gelangen.'
};

export const userNewsletter: MenuItem = {
    name: 'Newsletter',
    url: '/dashboard/user/newsletter',
    description: 'Klicke hier um die Newsletter abonnieren zu können.'
}
