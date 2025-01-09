type IconDict = {
    [key: string]: string;
};

const lookup: IconDict = {
    Web:         'fa-solid fa-globe',
    Twitch:      'fa-brands fa-twitch',
    Discord:     'fa-brands fa-discord',
    LinkedIn:    'fa-brands fa-linkedin',
    YouTube:     'fa-brands fa-youtube',
    Facebook:    'fa-brands fa-facebook',
    Instagram:   'fa-brands fa-instagram',
    X:           'fa-brands fa-x-twitter',
    Git:         'fa-brands fa-git-alt',
    GitHub:      'fa-brands fa-github',
    GitLab:      'fa-brands fa-gitlab',
    Mail:        'fa-solid fa-envelope',
    Download:    'fa-solid fa-download',
    Calender:    'fa-solid fa-calendar-days',
    Clock:       'fa-solid fa-clock',
    CircleCross: 'fa-solid fa-circle-xmark',
    CircleCheck: 'fa-solid fa-circle-check',
    ArrowUp:     'fa-solid fa-arrow-up',
    ArrowDown:   'fa-solid fa-arrow-down',
};

export function iconLookup(type: string): string {
    if (type in lookup) {
        return lookup[type];
    }

    return lookup['Web'];
}
