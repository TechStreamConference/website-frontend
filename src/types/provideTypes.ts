export type Person = {
    bio: string,
    name: string,
    photo: string,
    short_bio: string,
}

export type Event = {
    description: string,
    descriptionHeadline: string,
    discordUrl: string,
    endDate: string,
    id: string,
    presskitUrl: string,
    startDate: string,
    subtitle: string,
    title: string,
    trailerUrl: string,
    twitchUrl: string,
    year: string,
}

export type Year = {
    event: Event,
    speakers: Person[],
}

export type IconLink = { link: string, name: string };
export type IconLinks = IconLink[];

export type MenuItem = {
    name: string,
    url: string,
    description: string,
}
export type Menu = MenuItem[];
