import { error } from '@sveltejs/kit';



export function getElementByTitle<T extends {
    title: string
}>(elements: T[], title: string): T {
    for (const entry of elements) {
        if (entry.title === title) {
            return entry;
        }
    }

    console.error(`not able to look up element by title: ${title}`);
    throw error(404);
}


export function getElementByID<T extends {
    id: number
}>(elements: T[], ID: number): T {
    for (const entry of elements) {
        if (entry.id === ID) {
            return entry;
        }
    }

    console.error(`not able to look up element by ID: ${ID}`);
    throw error(404);
}

export function getElementByUserIdSafe<T extends {
    user_id: number
}>(elements: T[], userID: number): T | undefined {
    for (const entry of elements) {
        if (entry.user_id === userID) {
            return entry;
        }
    }

    return undefined;
}

export function getIDFromTitle<T extends {
    id: number,
    title: string
}>(elements: T[], title: string): number {
    for (const entry of elements) {
        if (entry.title === title) {
            return entry.id;
        }
    }

    console.log(`not able to look up ID for ${title}`);
    throw error(404);
}

export function trimOrNull(entry: string): string | null {
    const trimmed = entry.trim();
    if (trimmed.length === 0) {
        return null;
    }
    return trimmed;
}
