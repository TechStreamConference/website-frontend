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
