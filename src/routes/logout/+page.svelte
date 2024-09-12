<script lang="ts">
	import { goto } from '$app/navigation';
	import { udpateLoginStatus } from 'helper/loggedIn';

	async function logout(): Promise<void> {
		const response: Response = await fetch('api/account/logout', { method: 'POST' });
		if (!response.ok) {
			return;
		}
		await udpateLoginStatus(fetch);
		goto('/');
	}

	logout();
</script>

<p>Logging out...</p>
