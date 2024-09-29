import type { Menu } from "types/provideTypes"
import * as Item from './menuItems'

export const headerOut: Menu = [
    Item.start,
    Item.login,
];

export const footerOut: Menu = [
    Item.login,
    Item.imprint,
];
