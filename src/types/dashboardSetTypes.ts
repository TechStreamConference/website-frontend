export type SetAdminGlobals = {
    footer_text: string;
}

export type SetAdminEvent = {
    id: number,
    title: string,
    subtitle: string,
    start_date: string,
    end_date: string,
    discord_url: string | null,
    twitch_url: string | null,
    presskit_url: string | null,
    trailer_url: string | null,
    trailer_poster_url: string | null,
    description_headline: string,
    description: string,
    schedule_visible_from: string | null,
    publish_date: string | null,
    call_for_papers_start: string | null,
    call_for_papers_end: string | null,
    frontpage_date: string | null,
}

export type SetAdminEventSpeaker = {
    id: number,
    name: string,
    visible_from: string | null,
}
export type SetAllAdminEventSpeaker = SetAdminEventSpeaker[];

export type SetSpeakerTeamMemberEvent = {
    name: string,
    short_bio: string,
    bio: string,
    photo_x: number,
    photo_y: number,
    photo_size: number,
}

export type SetUpdateSocialMediaLink = {
    id: number,
    social_media_type_id: number,
    url: string,
}
export type SetAllUpdateSocialMediaLink = {
    social_media_links: SetUpdateSocialMediaLink[],
};

export type SetCreateSocialMediaLink = {
    social_media_type_id: number,
    url: string,
}

export type SetTalk = {
    title: string,
    description: string,
    tag_ids: number[],
    possible_durations: number[],
    notes: string,
}
