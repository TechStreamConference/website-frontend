export function validateRequestedChanges(changes: string): string[] {
    const messages: string[] = [];

    if (changes.trim().length === 0) {
        messages.push("Es wurden keine Änderungswünsche eingetragen.");
    }

    return messages;
}


export function validateApproval(changes: string): string[] {
    const messages: string[] = [];

    if (changes.trim().length > 0) {
        messages.push("Es ist nicht möglich, den Datensatz freizugeben, solange Änderungswünsche eingetragen sind.");
    }

    return messages;
}
