import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
    const result = await fetch('api/account');

    if (!result.ok) {
        throw redirect(302, '/login');
    }

    return {};
}
