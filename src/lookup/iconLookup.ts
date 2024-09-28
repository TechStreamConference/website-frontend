type IconDict = {
    [key: string]: string;
};

const lookup: IconDict = {
    "Web": "fa-solid fa-globe",
    "Twitch": "fa-brands fa-twitch",
    "Discord": "fa-brands fa-discord",
    "LinkedIn": "fa-brands fa-linkedin",
    "YouTube": "fa-brands fa-youtube",
    "Instagram": "fa-brands fa-instagram",
    "X": "fa-brands fa-x-twitter",
    "Git": "fa-brands fa-git-alt",
    "Mail": "fa-solid fa-envelope",
    "Download": "fa-solid fa-download",
    "Calender": "fa-solid fa-calendar-days",
}

export function iconLookup(type: string): string {
    if (type in lookup){
        return lookup[type];
    }

    return lookup['Web'];
}
