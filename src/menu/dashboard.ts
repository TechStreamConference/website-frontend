import type { Menu, Roles } from "types/provideTypes";
import * as Item from './menuItems'

export function headerOut(roles: Roles): Menu {
    let menu: Menu = [
        Item.mainPage,
    ];

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

    menu.push(Item.logout);
    return menu;
}

export const footerOut: Menu = [
    Item.imprint,
];
