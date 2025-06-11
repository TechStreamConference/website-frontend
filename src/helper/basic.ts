export function get_element_by_title<T extends {
    title: string
}>(elements: T[], title: string): T {
    for (const entry of elements) {
        if (entry.title === title) {
            return entry;
        }
    }

    console.error(`not able to look up an element by title: ${title}`);
    // TODO: ROUTING
    // throw error(404);
}


export function get_element_by_id<T extends {
    id: number
}>(elements: T[], ID: number): T {
    for (const entry of elements) {
        if (entry.id === ID) {
            return entry;
        }
    }

    console.error(`not able to look up an element by ID: ${ID}`);
    // TODO: ROUTING
    // throw error(404);
}

export function get_element_by_user_id_safe<T extends {
    user_id: number
}>(elements: T[], userID: number): T | undefined {
    for (const entry of elements) {
        if (entry.user_id === userID) {
            return entry;
        }
    }

    return undefined;
}

export function get_id_from_title<T extends {
    id: number,
    title: string
}>(elements: T[], title: string): number {
    for (const entry of elements) {
        if (entry.title === title) {
            return entry.id;
        }
    }

    console.log(`not able to look up ID for ${title}`);
    // TODO: ROUTING
    // throw error(404);
}

export function trim_or_null(entry: string): string | null {
    const trimmed = entry.trim();
    if (trimmed.length === 0) {
        return null;
    }
    return trimmed;
}


export function set_focus(id: string): void {
    const element = document.getElementById(id) as HTMLElement;
    if (!element) {
        console.error(`could not find an element with id '${id}'. Focus not set.`);
        return;
    }

    element.focus();
}
