<script lang="ts">
	import type { LoadAdmin } from 'types/loadTypes';
	export let data: LoadAdmin; // data from database

	import { apiUrl } from 'helper/links';

	import SectionDashboard from 'elements/section/sectionDashboard.svelte';

	import Button from 'elements/input/button.svelte';
	import Input from 'elements/input/input.svelte';
	import Message from 'elements/text/message.svelte';
	import TextArea from 'elements/input/textArea.svelte';

	let errorMessage: string = '';
	let successMessage: string = '';
	let successTimer: number | null = null;

	async function trySaveAsync(): Promise<void> {
		if (successTimer) {
			clearTimeout(successTimer);
		}
		const response: Response = await fetch(apiUrl('/api/dashboard/admin/globals'), {
			method: 'PUT',
			body: JSON.stringify(data.admin)
		});

		console.log(response);

		if (response.ok) {
			successMessage = 'Gespeichert';
			errorMessage = '';
			setTimeout(() => {
				resetSuccessMessage();
			}, 3000);
			return;
		}

		successMessage = '';
		errorMessage = 'Fehler beim Speichern';
	}

	function resetSuccessMessage(): void {
		successMessage = '';
	}
</script>

<SectionDashboard classes="dashboard-admin-global-section">
	<Message message={errorMessage} />
	<Message classes="success-color" message={successMessage} />
	<form class="width-wrapper global-admin-form" on:submit|preventDefault={trySaveAsync}>
		<Input
			classes="admin-default-year input"
			id="admin-default-year"
			type="number"
			labelText="Aktuelles Jahr:"
			placeholderText="Aktuelles Jahr"
			ariaLabel="Gib das aktuelle Jahr der Internetseite ein"
			bind:value={data.admin.default_year}
		/>
		<TextArea
			classes="admin-footer-description input"
			id="admin-footer-description"
			type="text"
			labelText="Footer Beschreibung:"
			placeholderText="Footer Beschreibung"
			ariaLabel="Gib den Text ein, der im Footer der Internetseite angezeigt werden soll"
			bind:value={data.admin.footer_text}
		/>

		<Button classes="text submit-button" type={'submit'} ariaLabel="Klicke zum Speichern">
			Speichern
		</Button>
	</form>
</SectionDashboard>

<style>
	:global(.dashboard-admin-global-section) {
		max-width: 70rem;
	}
	:global(.global-admin-form-headline) {
		margin-bottom: 1rem;
	}
	.global-admin-form {
		display: flex;
		flex-direction: column;
	}
	.global-admin-form :global(.input) {
		margin-top: 1rem;
	}
	.global-admin-form :global(.submit-button) {
		margin-top: 3rem;
		align-self: center;
	}
</style>
