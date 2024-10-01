import { z } from 'zod';

export const personScheme = z.object({
    bio: z.string(),
    short_bio: z.string(),
    name: z.string(),
    photo: z.string(),
})
export type Person = z.infer<typeof personScheme>;

export const eventScheme = z.object({
    id: z.string(),
    year: z.number(),
    title: z.string(),
    subtitle: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    description_headline: z.string(),
    description: z.string(),
    discord_url: z.string(),
    twitch_url: z.string(),
    presskit_url: z.string(),
    trailer_youtube_id: z.string(),
});
export type Event = z.infer<typeof eventScheme>;

export const yearScheme = z.object({
    event: eventScheme,
    speakers: z.array(personScheme),
});
export type Year = z.infer<typeof yearScheme>;

export const iconLinkScheme = z.object({
    link: z.string(),
    name: z.string(),
});
export type IconLink = z.infer<typeof iconLinkScheme>;

export const iconLinksScheme = z.array(iconLinkScheme);
export type IconLinks = z.infer<typeof iconLinksScheme>;


export const menuItemScheme = z.object({
    name: z.string(),
    url: z.string(),
    description: z.string(),
})
export type MenuItem = z.infer<typeof menuItemScheme>;

export const menuScheme = z.array(menuItemScheme);
export type Menu = z.infer<typeof menuScheme>;
