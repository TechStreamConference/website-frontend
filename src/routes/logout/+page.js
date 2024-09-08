import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) { // using load here to make sure the page is not seen
    const result = await fetch('api/account/logout', { method: 'POST' });

    if (result.ok) {
        throw redirect(302, '/');
    }

    return {};
}
