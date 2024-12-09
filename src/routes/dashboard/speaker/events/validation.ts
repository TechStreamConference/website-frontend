import type { SetSpeakerTeamMemberEvent } from "types/dashboardSetTypes";

export function validateSpeaker(data: SetSpeakerTeamMemberEvent): string[] {
    const messages: string[] = [];

    const fields: string[] = [
        data.name,
        data.short_bio,
        data.bio
    ];
    const errors: string[] = [
        "Der Name darf nicht leer sein.",
        "Die Kurzbeschreibung darf nicht leer sein.",
        "Die Beschreibung darf nicht leer sein."
    ]

    for (var i = 0; i < fields.length; ++i) {
        if (fields[i].trim().length === 0) {
            messages.push(errors[i]);
        }
    }

    return messages;
}
