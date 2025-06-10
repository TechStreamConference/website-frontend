import {z} from 'zod';

export const globals_scheme = z.object({
    footer_text: z.string(),
    years_with_events: z.array(z.number()),
});
export type Globals = z.infer<typeof globals_scheme>;
export const globals_default: Globals = {
    footer_text: '',
    years_with_events: [],
};

export const talk_tag_scheme = z.object({
    id: z.number(),
    color_index: z.number(),
    text: z.string(),
});
export type TalkTag = z.infer<typeof talk_tag_scheme>;
export const all_talk_tag_scheme = z.array(talk_tag_scheme);
export type AllTalkTag = z.infer<typeof all_talk_tag_scheme>;

export const social_media_link_scheme = z.object({
    name: z.string(),
    url: z.string(),
});
export type SocialMediaLink = z.infer<typeof social_media_link_scheme>;

export const social_media_links_scheme = z.array(social_media_link_scheme);
export type SocialMediaLinks = z.infer<typeof social_media_links_scheme>;

export const sponsor_link_scheme = z.object({
    url: z.string(),
    logo: z.string(),
    name: z.string(),
    alt_text: z.string(),
    copyright: z.string().nullable(),
});
export type SponsorLink = z.infer<typeof sponsor_link_scheme>;

export const sponsor_links_scheme = z.array(sponsor_link_scheme);
export type SponsorLinks = z.infer<typeof sponsor_links_scheme>;

export const person_scheme = z.object({
    id: z.number(),
    bio: z.string(),
    short_bio: z.string(),
    name: z.string(),
    photo: z.string(),
    social_media_links: sponsor_links_scheme,
});
export type Person = z.infer<typeof person_scheme>;

export const talk_scheme = z.object({
    speaker_id: z.number(),
    starts_at: z.string(),
    duration: z.number(),
    title: z.string(),
    description: z.string(),
    tags: all_talk_tag_scheme,
    guests: z.array(person_scheme),
    is_special: z.boolean(),
});
export type Talk = z.infer<typeof talk_scheme>;

export const event_scheme = z.object({
    id: z.number(),
    year: z.number(),
    title: z.string(),
    subtitle: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    description_headline: z.string(),
    description: z.string(),
    discord_url: z.string().nullable(),
    twitch_url: z.string().nullable(),
    presskit_url: z.string().nullable(),
    trailer_youtube_id: z.string().nullable(),
    is_visible_on_frontpage: z.boolean(),
    call_for_papers_start: z.string().nullable(),
    call_for_papers_end: z.string().nullable(),
});
export type Event = z.infer<typeof event_scheme>;

export const year_scheme = z.object({
    event: event_scheme,
    speakers: z.array(person_scheme),
    team_members: z.array(person_scheme),
    sponsors: sponsor_links_scheme,
    media_partners: sponsor_links_scheme,
    talks: z.array(talk_scheme),
});
export type Year = z.infer<typeof year_scheme>;

export const simple_error_scheme = z.object({error: z.string()});
export type SimpleError = z.infer<typeof simple_error_scheme>;
