import Joi from "joi";

export type Person = {
    bio: string,
    short_bio: string,
    name: string,
    photo: string,
}
export const personScheme: Joi.ObjectSchema<Person> = Joi.object({
    bio: Joi.string().min(1).required(),
    short_bio: Joi.string().min(1).required(),
    name: Joi.string().min(1).required(),
    photo: Joi.string().min(1).required(),
});

export type Event = {
    id: string,
    year: number,
    title: string,
    subtitle: string,
    start_date: string,
    end_date: string,
    description_headline: string,
    description: string,
    discord_url: string,
    twitch_url: string,
    presskit_url: string,
    trailer_youtube_id: string,
}
export const eventScheme: Joi.ObjectSchema<Event> = Joi.object({
    id: Joi.string().min(1).required(),
    year: Joi.number().min(2024).required(),
    title: Joi.string().min(1).required(),
    subtitle: Joi.string().min(1).required(),
    start_date: Joi.string().min(1).required(),
    end_date: Joi.string().min(1).required(),
    description_headline: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    discord_url: Joi.string().min(1).required(),
    twitch_url: Joi.string().min(1).required(),
    presskit_url: Joi.string().min(1).required(),
    trailer_youtube_id: Joi.string().min(1).required(),
});

export type Year = {
    event: Event,
    speakers: Person[],
}
export const yearScheme: Joi.ObjectSchema<Year> = Joi.object({
    event: eventScheme,
    speakers: Joi.array().items(personScheme).required(),
});

export type IconLink = { link: string, name: string };
export const iconLinkScheme: Joi.ObjectSchema<IconLink> = Joi.object({
    link: Joi.string().min(1).required(),
    name: Joi.string().min(1).required(),
});
export type IconLinks = IconLink[];
export const iconLinksScheme: Joi.ArraySchema<IconLinks> = Joi.array().items(iconLinkScheme).required();


export type MenuItem = {
    name: string,
    url: string,
    description: string,
}
export type Menu = MenuItem[];
