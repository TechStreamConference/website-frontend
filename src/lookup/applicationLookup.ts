type ApplicationDict = {
    [key: string]: string;
};


const lookup: ApplicationDict = {
    'User cannot apply as speaker since they already are a speaker.':              'Du hast dich bereits beworben.\nDaher kannst du dich nicht erneut bewerben.\nWenn du bereits ein Speaker bist, kannst du deine Daten im Speaker Tab bearbeiten.',
    'Speaker applications are not accepted at this time.':                         'Aktuell kann man sich nicht bewerben.\nSchau gerne bei der nächsten Bewerbungsphase wieder vorbei.\nWenn du bereits ein Speaker bist, kannst du deine Daten im Speaker Tab bearbeiten.',
    'User cannot apply as speaker since they already have a pending application.': 'Du hast dich bereits für dieses Jahr beworben\nWir sind gerade dabei deine Bewerbung zu überprüfen.\nSobald wir deine Bewerbung angenommen haben, kannst du deinen Eintrag im Speaker Dashboard bearbeiten.',
};


export function applicationLookup(key: string): string {
    if (key in lookup) {
        return lookup[key];
    }

    return key;
}
