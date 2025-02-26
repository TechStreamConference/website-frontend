import type { Menu } from 'types/provideTypes';
import * as YearItem from './yearItems';
import * as PageItem from './pageItems';

export const headerMainIn: Menu = [
    PageItem.top,
    YearItem.speaker,
    YearItem.sponsors,
    YearItem.team,
    YearItem.schedule,
    PageItem.intern,
    PageItem.logout,
];

export const headerMainOut: Menu = [
    PageItem.top,
    YearItem.speaker,
    YearItem.sponsors,
    YearItem.team,
    YearItem.schedule,
    PageItem.login,
];

export const headerIn: Menu  = [
    PageItem.mainPage,
    PageItem.intern,
    PageItem.logout,
];
export const headerOut: Menu = [
    PageItem.mainPage,
    PageItem.login,
    PageItem.register,
];

export const footerIn: Menu  = [
    PageItem.mainPage,
    PageItem.intern,
    PageItem.logout,
    PageItem.contact,
    PageItem.imprint,
];
export const footerOut: Menu = [
    PageItem.mainPage,
    PageItem.login,
    PageItem.register,
    PageItem.contact,
    PageItem.imprint,
];
