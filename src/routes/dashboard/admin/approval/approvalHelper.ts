export function getBackgroundClass(diff: string[] | null, reference: string): string {
    if (!diff) {
        return '';
    }
    return diff.includes(reference) ? 'dashboard-admin-approval-has-changed-background text-line-white' : '';
}
