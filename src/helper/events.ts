import type { DashboardEvent } from 'types/dashboardProvideTypes';
import { error } from '@sveltejs/kit';

export function getEventByTitle(event: DashboardEvent[], title: string): DashboardEvent {
    for (const entry of event) {
        if (entry.title === title) {
            return entry;
        }
    }

    console.error(`not able to look up event by title: ${title}`);
    throw error(404);
}


export function getEventByID(event: DashboardEvent[], ID: number): DashboardEvent {
    for (const entry of event) {
        if (entry.id === ID) {
            return entry;
        }
    }

    console.error(`not able to look up event by ID: ${ID}`);
    throw error(404);
}
