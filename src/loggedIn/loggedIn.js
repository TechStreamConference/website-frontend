export async function isLoggedIn() {
    const response = await fetch('api/account');
    return response.ok;
}
