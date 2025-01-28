import { ApprovalSection } from 'types/approvalSection';

export class ApprovalData { // use a class here to be able to check types in js
    constructor(public section: ApprovalSection, public id: number) {
    }
}

export class RejectData { // use a class here to be able to check types in js
    constructor(public id: number, public user_id: number, public event_id: number) {
    }
}

export function getBackgroundClass(diff: string[] | null, reference: string): string {
    if (!diff) {
        return '';
    }
    return diff.includes(reference) ? 'dashboard-admin-approval-has-changed-background text-line-white' : '';
}
