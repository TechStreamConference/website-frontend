import type { Menu } from 'types/provideTypes';
import * as YearItem from './yearItems';
import * as PageItem from './pageItems';

export function getHeaderMenuForLoggedInHiddenEvent(lastYearLink: string): Menu {
    return [
        PageItem.top,
        {
            name: 'Vorheriges Event',
            url: lastYearLink,
            description: "Klicke hier, um zum vorherigen Event zu gelangen"
        },
        PageItem.intern,
        PageItem.logout,
    ]
}

export function getHeaderMenuForLoggedOutHiddenEvent(lastYearLink: string): Menu {
    return [
        PageItem.top,
        {
            name: 'Vorheriges Event',
            url: lastYearLink,
            description: "Klicke hier, um zum vorherigen Event zu gelangen"
        },
        PageItem.login,
        PageItem.register,
    ]
}


export const headerMainLoggedIn: Menu = [
    PageItem.top,
    YearItem.speaker,
    YearItem.sponsors,
    YearItem.team,
    YearItem.schedule,
    PageItem.intern,
    PageItem.logout,
];

export const headerMainLoggedOut: Menu = [
    PageItem.top,
    YearItem.speaker,
    YearItem.sponsors,
    YearItem.team,
    YearItem.schedule,
    PageItem.login,
];

export const headerLoggedIn: Menu  = [
    PageItem.mainPage,
    PageItem.intern,
    PageItem.logout,
];
export const headerLoggedOut: Menu = [
    PageItem.mainPage,
    PageItem.login,
    PageItem.register,
];

export const footerLoggedIn: Menu  = [
    PageItem.mainPage,
    PageItem.intern,
    PageItem.logout,
    PageItem.contact,
    PageItem.imprint,
];
export const footerLoggedOut: Menu = [
    PageItem.mainPage,
    PageItem.login,
    PageItem.register,
    PageItem.contact,
    PageItem.imprint,
];
