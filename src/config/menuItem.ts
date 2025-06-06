export type MenuItem = {
    path: string;
    label: string;
    aria: string;
};

// Homepage
export const top_item: MenuItem = {
    label: 'Top',
    path: '#top',
    aria: 'Klicke, um zur aktuellen Hauptseite zurückzukehren',
};

export const homepage_speaker_item: MenuItem = {
    label: 'Vortragende',
    path: '#Speaker',
    aria: 'Klicke, um zu den Vortragenden zu navigieren',
};

export const homepage_sponsors_item: MenuItem = {
    label: 'Partner',
    path: '#Sponsors',
    aria: 'Klicke, um zu den Sponsoren und Partnern zu navigieren',
};

export const homepage_team_item: MenuItem = {
    label: 'Team',
    path: '#Team',
    aria: 'Klicke, um zum Tech Stream Conference-Team zu navigieren',
};

export const homepage_schedule_item: MenuItem = {
    label: 'Ablaufplan',
    path: '#Schedule',
    aria: 'Klicke, um zum Ablaufplan der Konferenz zu navigieren',
};

// main pages
export const homepage_item: MenuItem = {
    label: 'Homepage',
    path: '/',
    aria: 'Klicke hier, um zur Hauptseite zu gelangen.',
}

export const imprint_item: MenuItem = {
    label: 'Impressum',
    path: '/imprint',
    aria: 'Klicke hier, um zum Impressum zu gelangen.',
};

export const dashboard_item: MenuItem = {
    label: 'Dashboard',
    path: '/dashboard',
    aria: 'Klicke hier, um zum Dashboard zu gelangen.',
};

export const logout_item: MenuItem = {
    label: 'Abmelden',
    path: '/logout',
    aria: 'Klicke hier zum Abmelden',
};

export const login_item: MenuItem = {
    label: 'Anmelden',
    path: '/login',
    aria: 'Klicke hier zum Anmelden',
};

export const register_item: MenuItem = {
    label: 'Registrieren',
    path: '/register',
    aria: 'Klicke hier zum Registrieren',
};

export const contact_item: MenuItem = {
    label: 'Kontakt',
    path: '/contact',
    aria: 'Klicke hier, um mit uns in Kontakt zu treten',
};

// dashboard
export const admin_globals_item: MenuItem = {
    label: 'Globals',
    path: '/dashboard/admin/globals',
    aria: 'Klicke hier, um zu den globalen Einstellungen im Admin-Dashboard zu gelangen',
};
export const admin_events_slots_item: MenuItem = {
    label: 'Zeit-Slots',
    path: '/dashboard/admin/time-slots',
    aria: 'Klicke hier, um zu den Time-Slot-Einstellungen zu gelangen',
};
export const admin_panel_discussion_guests_item: MenuItem = {
    label: 'Gäste',
    path: '/dashboard/admin/panel-discussion-guests',
    aria: 'Klicke hier, um einem Talk Gäste zuzuweisen',
};
export const admin_create_panel_discussion_item: MenuItem = {
    label: 'Gesprächsrunde anlegen',
    path: '/dashboard/admin/create-panel-discussion',
    aria: 'Klicke hier, um eine neue Gesprächsrunde anzulegen',
};
export const admin_events_item: MenuItem = {
    label: 'Events',
    path: '/dashboard/admin/events',
    aria: 'Klicke hier, um zu den Event-Einstellungen zu gelangen',
};
export const admin_new_event_item: MenuItem = {
    label: 'Neues Event',
    path: '/dashboard/admin/new-event',
    aria: 'Klicke hier, um ein neues Event anzulegen',
};
export const admin_approval_speaker_team_member_item: MenuItem = {
    label: 'Freigabe Speaker / Team-Member',
    path: '/dashboard/admin/approval-speaker-team-member',
    aria: 'Klicke hier, um ausstehende Freigaben von Speakern und Team-Membern zu bearbeiten',
};
export const admin_approval_talk_item: MenuItem = {
    label: 'Freigabe Vorträge',
    path: '/dashboard/admin/approval-talk',
    aria: 'Klicke hier, um ausstehende Freigaben von Vorträgen zu bearbeiten',
};

export const speaker_events_item: MenuItem = {
    label: 'Events',
    path: '/dashboard/speaker/events',
    aria: 'Klicke hier, um zu den event-spezifischen Einstellungen zu gelangen',
};
export const speaker_talk_item: MenuItem = {
    label: 'Meine Talks',
    path: '/dashboard/speaker/talk',
    aria: 'Klicke hier, um zu den Talk-Einstellungen zu gelangen',
};
export const speaker_social_media_item: MenuItem = {
    label: 'Social Media',
    path: '/dashboard/speaker/socials',
    aria: 'Klicke hier, um zu den Social-Media-Einstellungen zu gelangen',
};
export const speaker_application_item: MenuItem = {
    label: 'Talk einreichen',
    path: '/dashboard/speaker/application',
    aria: 'Klicke hier, um einen neuen Talk einzureichen',
};

export const team_member_events_item: MenuItem = {
    label: 'Events',
    path: '/dashboard/team-member/events',
    aria: 'Klicke hier, um zu den event-spezifischen Einstellungen zu gelangen',
};
export const team_member_social_media_item: MenuItem = {
    label: 'Social Media',
    path: '/dashboard/team-member/social-media',
    aria: 'Klicke hier, um zu den Social-Media-Einstellungen zu gelangen',
};

export const user_profile_item: MenuItem = {
    label: 'Profil',
    path: '/dashboard/user/profile',
    aria: 'Klicke hier, um das Profil zu bearbeiten',
};
export const user_application_item: MenuItem = {
    label: 'Bewerbung',
    path: '/dashboard/user/application',
    aria: 'Klicke hier, um dich als Speaker für das aktuelle Event zu bewerben',
};

// default dashboard routes within the dashboard pages
export const admin_item: MenuItem = {
    label: 'Admin',
    path: admin_approval_speaker_team_member_item.path,
    aria: 'Klicke hier, um zum Admin-Dashboard zu gelangen',
};
export const team_member_item: MenuItem = {
    label: 'Team Member',
    path: team_member_events_item.path,
    aria: 'Klicke hier, um zum Team-Member-Dashboard zu gelangen',
};
export const speaker_item: MenuItem = {
    label: 'Speaker',
    path: speaker_events_item.path,
    aria: 'Klicke hier, um zum Speaker-Dashboard zu gelangen',
};
export const user_item: MenuItem = {
    label: 'User',
    path: user_profile_item.path,
    aria: 'Klicke hier, um zum User-Dashboard zu gelangen',
};
