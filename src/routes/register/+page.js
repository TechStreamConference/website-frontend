import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
    const result = await fetch('api/account');

    if (result.ok) {
        throw redirect(302, '/');
    }

    const currentYear = 2025; // TODO: load from database

    return {
        currentYear: currentYear
    };
}
