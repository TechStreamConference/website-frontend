import { z } from 'zod';

export const socialMediaLinkScheme = z.object({
    name: z.string(),
    url: z.string(),
});
export type SocialMediaLink = z.infer<typeof socialMediaLinkScheme>;

export const socialMediaLinksScheme = z.array(socialMediaLinkScheme);
export type SocialMediaLinks = z.infer<typeof socialMediaLinksScheme>;

export const imageScheme = z.object({
    url: z.string(),
    image_url: z.string(),
    name:z.string(),
    description: z.string(),
})
export type Image = z.infer<typeof imageScheme>;

export const imagesScheme = z.array(imageScheme);
export type Images = z.infer<typeof imagesScheme>;

export const personScheme = z.object({
    bio: z.string(),
    short_bio: z.string(),
    name: z.string(),
    photo: z.string(),
    social_media_links: socialMediaLinksScheme,
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




export const menuItemScheme = z.object({
    name: z.string(),
    url: z.string(),
    description: z.string(),
})
export type MenuItem = z.infer<typeof menuItemScheme>;

export const menuScheme = z.array(menuItemScheme);
export type Menu = z.infer<typeof menuScheme>;
