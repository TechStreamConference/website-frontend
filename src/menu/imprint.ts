import type { Menu } from 'types/provideTypes';
import * as Item from './menuItems';

export const headerOut: Menu = [
    Item.mainPage,
    Item.login,
    Item.register,
];

export const headerIn: Menu = [
    Item.mainPage,
    Item.logout,
];


export const footerOut: Menu = [
    Item.mainPage,
    Item.login,
    Item.register,
];

export const footerIn: Menu = [
    Item.mainPage,
    Item.intern,
];
