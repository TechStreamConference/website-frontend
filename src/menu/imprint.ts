import type { Menu } from "types/provideTypes";
import * as Item from './menuItems'

export const headerOut: Menu = [
    Item.start,
    Item.login,
    Item.register,
];

export const headerIn: Menu = [
    Item.start,
    Item.logout,
];


export const footerOut: Menu = [
    Item.start,
    Item.login,
    Item.register,
];

export const footerIn: Menu = [
    Item.start,
    Item.intern,
];
