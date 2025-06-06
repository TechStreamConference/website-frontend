import * as Item from '@/config/menuItem'
import type {DashboardRoles} from "@/types/dashboardProvideTypes";

export type Menu = Item.MenuItem[];

// page
export const homepage_header_menu_in: Menu = [
    Item.top_item,
    Item.homepage_speaker_item,
    Item.homepage_sponsors_item,
    Item.homepage_team_item,
    Item.homepage_schedule_item,
    Item.dashboard_item,
    Item.logout_item,
];

export const homepage_header_menu_out: Menu = [
    Item.top_item,
    Item.homepage_speaker_item,
    Item.homepage_sponsors_item,
    Item.homepage_team_item,
    Item.homepage_schedule_item,
    Item.login_item,
];

export const default_header_menu_in: Menu = [
    Item.homepage_item,
    Item.dashboard_item,
    Item.logout_item,
];
export const default_header_menu_out: Menu = [
    Item.homepage_item,
    Item.login_item,
    Item.register_item,
];

export const default_footer_menu_in: Menu = [
    Item.homepage_item,
    Item.dashboard_item,
    Item.logout_item,
    Item.contact_item,
    Item.imprint_item,
];
export const default_footer_menu_out: Menu = [
    Item.homepage_item,
    Item.login_item,
    Item.register_item,
    Item.contact_item,
    Item.imprint_item,
];

// dashboard

export function dashboard_section_menu(roles: DashboardRoles) {
    const menu: Menu = [];

    if (roles.is_admin) {
        menu.push(Item.admin_item);
    }
    if (roles.is_team_member) {
        menu.push(Item.team_member_item);
    }
    if (roles.is_speaker) {
        menu.push(Item.speaker_item);
    }
    menu.push(Item.user_item);

    return menu;
}

export const admin_menu: Menu = [
    Item.admin_approval_speaker_team_member_item,
    Item.admin_approval_talk_item,
    Item.admin_create_panel_discussion_item,
    Item.admin_panel_discussion_guests_item,
    Item.admin_events_slots_item,
    Item.admin_events_item,
    Item.admin_new_event_item,
    Item.admin_globals_item,
];
export const speaker: Menu = [
    Item.speaker_events_item,
    Item.speaker_talk_item,
    Item.speaker_application_item,
    Item.speaker_social_media_item,
];
export const teamMember: Menu = [
    Item.team_member_events_item,
    Item.team_member_social_media_item,
];
export const user: Menu = [
    Item.user_profile_item,
    Item.user_application_item,
];
