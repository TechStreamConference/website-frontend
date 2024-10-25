<script lang="ts">
	import { goto } from '$app/navigation';
	import { apiUrl } from 'helper/links';
	import { onMount } from 'svelte';
	import TextLine from 'elements/text/textLine.svelte';

	async function logoutAsync(): Promise<void> {
		const response: Response = await fetch(apiUrl('/api/account/logout'), { method: 'POST' });
		if (!response.ok) {
			return;
		}
		goto('/');
	}

	onMount(async () => {
		await logoutAsync();
	});
</script>

<TextLine>Logging out...</TextLine>
