const hashPrefix = 'dashboard-admin-approval';
const speakerHash = "speaker";
const teamMemberHash = "team-member";
const socialMediaHash = "social-media";

export function getSpeakerHash(id: number): string {
    return `${hashPrefix}-${speakerHash}-${id}`;
}
export function getTeamMemberHash(id: number): string {
    return `${hashPrefix}-${teamMemberHash}-${id}`;
}
export function getSocialMediaHash(id: number): string {
    return `${hashPrefix}-${socialMediaHash}-${id}`;
}


export function GetBackgroundClass(diff: string[] | null, reference: string): string {
    if (!diff) {
        return '';
    }
    return diff.includes(reference)
        ? 'dashboard-admin-approval-has-changed-background text-line-white'
        : '';
}
