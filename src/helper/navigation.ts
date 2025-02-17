export function getDropDownEntriesWithID<T extends {
    id: number,
    title: string
}>(data: T[]): string[] {
    return data.map((x) => `${x.id} | ${x.title}`);
}

export function getIdFromDropDownEntry(entry: string): number {
    const parts = entry.split(' | ');
    if (parts.length < 2) {
        console.error(`not able to split '${entry}' at ' | '`);
        return 0;
    }

    const id = Number(parts[0]);

    if (Number.isNaN(id)) {
        console.error(`not able to parse id from ${id}`);
        return 0;
    }

    return id;
}
