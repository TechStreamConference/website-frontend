import { error } from '@sveltejs/kit';

export function getElementByTitle<T extends {
    title: string
}>(elements: T[], title: string): T {
    for (const entry of elements) {
        if (entry.title === title) {
            return entry;
        }
    }

    console.error(`not able to look up event by title: ${title}`);
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

    console.error(`not able to look up event by ID: ${ID}`);
    throw error(404);
}
