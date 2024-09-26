type IconDict = {
    [key: string]: string;
};

/**
 * 		{ link: 'https://www.google.de', type: 'web' },
		{ link: 'https://www.google.de', type: 'twitch' },
		{ link: 'https://www.google.de', type: 'discord' },
		{ link: 'https://www.google.de', type: 'linkedin' },
		{ link: 'https://www.google.de', type: 'youtube' },
		{ link: 'https://www.google.de', type: 'instagram' },
		{ link: 'https://www.google.de', type: 'x' },
		{ link: 'https://www.google.de', type: 'git' },
		{ link: 'https://www.google.de', type: 'mail' },
		{ link: 'https://www.google.de', type: 'download' },
		{ link: 'https://www.google.de', type: 'calender' },
 */

const lookup: IconDict = {
    "web": "fa-solid fa-globe",
    "twitch": "fa-brands fa-twitch",
    "discord": "fa-brands fa-discord",
    "linkedin": "fa-brands fa-linkedin",
    "youtube": "fa-brands fa-youtube",
    "instagram": "fa-brands fa-instagram",
    "x": "fa-brands fa-x-twitter",
    "git": "fa-brands fa-git-alt",
    "mail": "fa-solid fa-envelope",
    "download": "fa-solid fa-download",
    "calender": "fa-solid fa-calendar-days",
}

export function iconLookup(type: string): string {
    if (type in lookup){
        return lookup[type];
    }

    return lookup['web'];
}
