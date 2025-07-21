export enum ApprovalSection {
    Speaker = 0,
    TeamMember = 1,
    SocialMedia = 2
}

const hashPrefix = 'dashboard-admin-approval';

export function getSectionHash(section: ApprovalSection, id: number): string {
    return `${hashPrefix}-${Number(section)}-${id}`;
}
