import type { Menu } from 'types/provideTypes';
import type { DashboardRoles } from 'types/dashboardProvideTypes';

import * as Item from './menuItems';

export function SectionIn(roles: DashboardRoles) {
    const menu: Menu = [];

    if (roles.is_admin) {
        menu.push(Item.admin);
    }
    if (roles.is_team_member) {
        menu.push(Item.teamMember);
    }
    if (roles.is_speaker) {
        menu.push(Item.speaker);
    }
    menu.push(Item.user);

    return menu;
}

export const headerIn: Menu = [
    Item.mainPage,
    Item.logout,
];

export const footerIn: Menu = [
    Item.imprint,
];

export const admin: Menu      = [
    Item.adminApprovalSpeakerTeamMember,
    Item.adminApprovalTalk,
    Item.adminPanelDiscussionGuests,
    Item.adminCreatePanelDiscussion,
    Item.adminEventSlots,
    Item.adminEvents,
    Item.adminNewEvent,
    Item.adminGlobals,
];
export const speaker: Menu    = [
    Item.speakerEvents,
    Item.speakerTalk,
    Item.speakerApplication,
    Item.speakerSocialMedia,
];
export const teamMember: Menu = [
    Item.teamMemberEvents,
    Item.teamMemberSocialMedia,
];
export const user: Menu       = [
    Item.userProfile,
    Item.userApplication,
];
