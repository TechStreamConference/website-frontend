<script lang="ts">
	import { page } from '$app/stores';
	import TextLine from 'elements/text/textLine.svelte';
	import { apiUrl } from 'helper/links';

	let token: string | null = null;
	let success: boolean | undefined = undefined;

	verify();

	async function verify(): Promise<void> {
		token = $page.url.searchParams.get('token');
		if (!token) {
			console.error('no token in URL');
			success = false;
			return;
		}

		const toSave = { token };
		const response = await fetch(apiUrl('/api/account/verify'), {
			method: 'POST',
			body: JSON.stringify(toSave)
		});

		if (!response.ok) {
			if (response.status === 400) {
				console.error(await response.json());
			}

			// error message
			success = false;
			return;
		}

		success = true;
	}
</script>

{#if success === undefined}
	<TextLine>E-Mail-Adresse wird verifiziert...</TextLine>
{:else if success}
	<TextLine>E-Mail-Adresse wurde verifiziert.</TextLine>
{:else}
	<TextLine>Token ist ungültig.</TextLine>
{/if}
