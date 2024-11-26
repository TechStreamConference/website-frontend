export function validateRequestedChanges(changes: string): string[] {
    const messages: string[] = [];

    if (changes.trim().length === 0) {
        messages.push("Es wurden keine Änderungswünsche eingetragen.");
    }

    return messages;
}


export function validateApproval(): string[] {
    const messages: string[] = [];
    return messages;
}
