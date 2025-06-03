export type MenuItem = {
    path: string;
    label: string;
    aria: string;
};

export const homepage: MenuItem = {
    path: '/',
    label: 'Homepage',
    aria: 'Klicke hier, um zur Hauptseite zu gelangen.',
}

export const imprint: MenuItem = {
    path: '/imprint',
    label: 'Impressum',
    aria: 'Klicke hier, um zum Impressum zu gelangen.',
};

export const dashboard: MenuItem = {
    path: '/dashboard',
    label: 'Dashboard',
    aria: 'Klicke hier, um zum Dashboard zu gelangen.',
};
