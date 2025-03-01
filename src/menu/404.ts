import type { Menu } from 'types/provideTypes';
import * as Item from 'menu/menuItems';

export const header: Menu = [
    Item.mainPage,
    Item.imprint,
    Item.contact,
];

export const footer: Menu = [
    Item.mainPage,
    Item.contact,
    Item.imprint,
];
