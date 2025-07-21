import type {Menu} from 'types/provideTypes';
import type {DashboardRoles} from 'types/dashboardProvideTypes';

import * as PageItem from './pageItems';
import * as DashboardItem from './dashboardItems';

export function getSectionLoggedIn(roles: DashboardRoles) {
    const menu: Menu = [];

    if (roles.is_admin) {
        menu.push(PageItem.admin);
    }
    if (roles.is_team_member) {
        menu.push(PageItem.teamMember);
    }
    if (roles.is_speaker) {
        menu.push(PageItem.speaker);
    }
    menu.push(PageItem.user);

    return menu;
}

export const admin: Menu = [
    DashboardItem.adminApprovalSpeakerTeamMember,
    DashboardItem.adminApprovalTalk,
    DashboardItem.adminPanelDiscussionGuests,
    DashboardItem.adminCreatePanelDiscussion,
    DashboardItem.adminEventSlots,
    DashboardItem.adminEvents,
    DashboardItem.adminNewEvent,
    DashboardItem.adminGlobals,
];
export const speaker: Menu = [
    DashboardItem.speakerEvents,
    DashboardItem.speakerTalk,
    DashboardItem.speakerApplication,
    DashboardItem.speakerSocialMedia,
];
export const teamMember: Menu = [
    DashboardItem.teamMemberEvents,
    DashboardItem.teamMemberSocialMedia,
];
export const user: Menu = [
    DashboardItem.userProfile,
    DashboardItem.userApplication,
];
