<script lang="ts">
	import { goto } from '$app/navigation';
	import { udpateLoginStatusAsync } from 'helper/loggedIn';
	import { apiUrl } from 'helper/links';
	import { onMount } from 'svelte';

	async function logoutAsync(): Promise<void> {
		const response: Response = await fetch(apiUrl('/api/account/logout'), { method: 'POST' });
		if (!response.ok) {
			return;
		}
		await udpateLoginStatusAsync(fetch);
		goto('/');
	}

	onMount( async ()=> {
		await logoutAsync();
	});
</script>

<p>Logging out...</p>
