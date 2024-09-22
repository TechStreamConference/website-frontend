export type Speaker = {
    bio: string,
    name: string,
    photo: string,
    short_bio: string,
    id: string,
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
}

export type Year = {
    event: Event,
    speakers: [Speaker],
}

export type IconLink = { link: string, type: string };
