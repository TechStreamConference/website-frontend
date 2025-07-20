import type {MenuItem} from 'types/provideTypes';

// @formatter:off
export const adminGlobals: MenuItem = {
    name:        'Globals',
    url:         '/dashboard/admin/globals',
    description: 'Klicke hier, um zu den globalen Einstellungen im Admin-Dashboard zu gelangen',
};
export const adminEventSlots: MenuItem = {
    name:        'Zeit-Slots',
    url:         '/dashboard/admin/time-slots',
    description: 'Klicke hier, um zu den Time-Slot-Einstellungen zu gelangen',
};
export const adminPanelDiscussionGuests: MenuItem = {
    name:        'Gäste',
    url:         '/dashboard/admin/panel-discussion-guests',
    description: 'Klicke hier, um einem Talk Gäste zuzuweisen',
};
export const adminCreatePanelDiscussion: MenuItem = {
    name:        'Gesprächsrunde anlegen',
    url:         '/dashboard/admin/create-panel-discussion',
    description: 'Klicke hier, um eine neue Gesprächsrunde anzulegen',
};
export const adminEvents: MenuItem = {
    name:        'Events',
    url:         '/dashboard/admin/events',
    description: 'Klicke hier, um zu den Event-Einstellungen zu gelangen',
};
export const adminNewEvent: MenuItem = {
    name:        'Neues Event',
    url:         '/dashboard/admin/new-event',
    description: 'Klicke hier, um ein neues Event anzulegen',
};
export const adminApprovalSpeakerTeamMember: MenuItem = {
    name:        'Freigabe Speaker / Team-Member',
    url:         '/dashboard/admin/approval-speaker-team-member',
    description: 'Klicke hier, um ausstehende Freigaben von Speakern und Team-Membern zu bearbeiten',
};
export const adminApprovalTalk: MenuItem = {
    name:        'Freigabe Vorträge',
    url:         '/dashboard/admin/approval-talk',
    description: 'Klicke hier, um ausstehende Freigaben von Vorträgen zu bearbeiten',
};

export const speakerEvents: MenuItem = {
    name:        'Events',
    url:         '/dashboard/speaker/events',
    description: 'Klicke hier, um zu den event-spezifischen Einstellungen zu gelangen',
};
export const speakerTalk: MenuItem = {
    name:        'Meine Talks',
    url:         '/dashboard/speaker/talk',
    description: 'Klicke hier, um zu den Talk-Einstellungen zu gelangen',
};
export const speakerSocialMedia: MenuItem = {
    name:        'Social Media',
    url:         '/dashboard/speaker/socials',
    description: 'Klicke hier, um zu den Social-Media-Einstellungen zu gelangen',
};
export const speakerApplication: MenuItem = {
    name:        'Talk einreichen',
    url:         '/dashboard/speaker/application',
    description: 'Klicke hier, um einen neuen Talk einzureichen',
};

export const teamMemberEvents: MenuItem = {
    name:        'Events',
    url:         '/dashboard/team-member/events',
    description: 'Klicke hier, um zu den event-spezifischen Einstellungen zu gelangen',
};
export const teamMemberSocialMedia: MenuItem = {
    name:        'Social Media',
    url:         '/dashboard/team-member/social-media',
    description: 'Klicke hier, um zu den Social-Media-Einstellungen zu gelangen',
};

export const userProfile: MenuItem = {
    name:        'Profil',
    url:         '/dashboard/user/profile',
    description: 'Klicke hier, um das Profil zu bearbeiten',
};
export const userApplication: MenuItem = {
    name:        'Bewerbung',
    url:         '/dashboard/user/application',
    description: 'Klicke hier, um dich als Speaker für das aktuelle Event zu bewerben',
};
// @formatter:on
