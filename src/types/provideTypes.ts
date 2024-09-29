export type Person = {
    bio: string,
    name: string,
    photo: string,
    short_bio: string,
}

export type Event = {
    description: string,
    description_headline: string,
    discord_url: string,
    end_date: string,
    id: string,
    presskit_url: string,
    start_date: string,
    subtitle: string,
    title: string,
    trailer_youtube_id: string,
    twitch_url: string,
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
