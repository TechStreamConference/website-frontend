import { z } from 'zod';

export const talkTagScheme = z.object({
    color_index: z.string(),
    text: z.string(),
})
export type TalkTag = z.infer<typeof talkTagScheme>;

export const talkScheme = z.object({
    speaker_id: z.string(),
    starts_at: z.string(),
    duration: z.string(),
    title: z.string(),
    description: z.string(),
    tags: z.array(talkTagScheme),
})
export type Talk = z.infer<typeof talkScheme>;

export const socialMediaLinkScheme = z.object({
    name: z.string(),
    url: z.string(),
});
export type SocialMediaLink = z.infer<typeof socialMediaLinkScheme>;

export const socialMediaLinksScheme = z.array(socialMediaLinkScheme);
export type SocialMediaLinks = z.infer<typeof socialMediaLinksScheme>;

export const sponsorLinkScheme = z.object({
    url: z.string(),
    logo: z.string(),
    name: z.string(),
    alt_text: z.string(),
    copyright: z.string().nullable(),
})
export type SponsorLink = z.infer<typeof sponsorLinkScheme>;

export const sponsorLinksScheme = z.array(sponsorLinkScheme);
export type SponsorLinks = z.infer<typeof sponsorLinksScheme>;

export const personScheme = z.object({
    id: z.string(),
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
    team_members: z.array(personScheme),
    sponsors: sponsorLinksScheme,
    media_partners: sponsorLinksScheme,
    talks: z.array(talkScheme),
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
