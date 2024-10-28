import type { Menu, MenuItem } from "types/provideTypes";
import * as Item from './menuItems'

const top: MenuItem = {
    name: 'Top',
    url: '#top',
    description: 'Klicke, um zur aktuellen Hauptseite zurückzukehren'
}

const speaker: MenuItem = {
    name: 'Vortragende',
    url: '#Speaker',
    description: 'Klicke, um zu den Vortragenden zu navigieren'
}

const sponsors: MenuItem = {
    name: 'Partner',
    url: '#Sponsors',
    description: 'Klicke, um zu den Sponsoren und Partnern zu navigieren'
}

const team: MenuItem = {
    name: 'Team',
    url: '#Team',
    description: 'Klicke, um zum Tech Stream Conference Team zu navigieren'
}

const schedule: MenuItem = {
    name: 'Ablaufplan',
    url: '#Schedule',
    description: 'Klicke, um zum Ablaufplan der Konferenz zu navigieren'
}


export const headerIn: Menu = [
    top,
    speaker,
    sponsors,
    team,
    schedule,
    Item.intern,
    Item.logout,
];

export const headerOut: Menu = [
    top,
    speaker,
    sponsors,
    team,
    schedule,
    Item.login,
];

export const footerIn: Menu = [
    Item.intern,
    Item.logout,
    Item.imprint,
];

export const footerOut: Menu = [
    Item.login,
    Item.register,
    Item.imprint,
];
