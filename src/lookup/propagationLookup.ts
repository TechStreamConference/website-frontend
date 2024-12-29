type PropagationDict = {
    [key: string]: string;
};


const lookup: PropagationDict = {
    'User cannot apply as speaker since they already are a speaker.': 'Du hast dich bereits beworben.\nDaher kannst du dich nicht erneut bewerben.\nWenn du bereits ein Speaker bist, kannst du deine Daten im Speaker Tab bearbeiten.',
    'Speaker applications are not accepted at this time.':            'Aktuell kann man sich nicht bewerben.\nSchau gerne bei der nächsten Bewerbungsphase wieder vorbei.\nWenn du bereits ein Speaker bist, kannst du deine Daten im Speaker Tab bearbeiten.',
};


export function propagationLookup(key: string): string {
    if (key in lookup) {
        return lookup[key];
    }

    return key;
}
