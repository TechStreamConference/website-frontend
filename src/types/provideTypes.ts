import { z } from 'zod';

export const rolesScheme = z.object({
    user_id: z.number(),
    email: z.string(),
    is_speaker: z.boolean(),
    is_team_member: z.boolean(),
    is_admin: z.boolean(),
})
export type Roles = z.infer<typeof rolesScheme>;

export const globalsScheme = z.object({
    default_year: z.number(),
    footer_text: z.string(),
})
export type Globals = z.infer<typeof globalsScheme>;

export const talkTagScheme = z.object({
    color_index: z.number(),
    text: z.string(),
})
export type TalkTag = z.infer<typeof talkTagScheme>;

export const talkScheme = z.object({
    speaker_id: z.number(),
    starts_at: z.string(),
    duration: z.number(),
    title: z.string(),
    description: z.string(),
    tags: z.array(talkTagScheme),
    is_special: z.boolean(),
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
    id: z.number(),
    bio: z.string(),
    short_bio: z.string(),
    name: z.string(),
    photo: z.string(),
    social_media_links: socialMediaLinksScheme,
})
export type Person = z.infer<typeof personScheme>;

export const eventScheme = z.object({
    id: z.number(),
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
