<script lang="ts">
	import { goto } from '$app/navigation';
	import { udpateLoginStatusAsync } from 'helper/loggedIn';

	async function logoutAsync(): Promise<void> {
		const response: Response = await fetch('api/account/logout', { method: 'POST' });
		if (!response.ok) {
			return;
		}
		await udpateLoginStatusAsync(fetch);
		goto('/');
	}

	logoutAsync();
</script>

<p>Logging out...</p>
