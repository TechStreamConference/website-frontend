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
    trailer_youtube_id: string | null,
    description_headline: string,
    description: string,
    schedule_visible_from: string | null,
    publish_date: string | null,
}

export type SetAdminEventSpeaker = {
    id: number,
    name: string,
    date: string | null,
}
export type SetAllAdminEventSpeaker = SetAdminEventSpeaker[];
