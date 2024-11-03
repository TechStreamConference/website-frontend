<script lang="ts">
	import type { LoadDashboard, LoadAdminGlobal } from 'types/dashboardLoadTypes';
	import { Clone } from 'helper/clone';

	import SectionDashboard from 'elements/section/sectionDashboard.svelte';
	import Button from 'elements/input/button.svelte';
	import Message from 'elements/text/message.svelte';
	import TextArea from 'elements/input/textArea.svelte';

	import { apiUrl } from 'helper/links';
	import { resetUnsavedChanges, setUnsavedChanges } from 'stores/saved';

	export let data: LoadDashboard & LoadAdminGlobal; // data from database
	let copiedData = new Clone<LoadDashboard & LoadAdminGlobal>(data); // copied data from database to not save original data until save

	let errorMessage: string = '';
	let successMessage: string = '';
	let successTimer: number | null = null;

	async function trySaveAsync(): Promise<void> {
		if (successTimer) {
			clearTimeout(successTimer);
		}
		const response: Response = await fetch(apiUrl('/api/dashboard/admin/globals'), {
			method: 'PUT',
			body: JSON.stringify(copiedData.value.admin)
		});

		if (response.ok) {
			successMessage = 'Gespeichert';
			errorMessage = '';
			setTimeout(() => {
				resetSuccessMessage();
			}, 3000);
			data = copiedData.get();
			resetUnsavedChanges();
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
	<Message classes="message-success-color" message={successMessage} />
	<form class="dashboard-admin-global-form" on:submit|preventDefault={trySaveAsync}>
		<TextArea
			classes="admin-footer-description input"
			id="admin-footer-description"
			labelText="Footer Beschreibung:"
			placeholderText="Footer Beschreibung"
			ariaLabel="Gib den Text ein, der im Footer der Internetseite angezeigt werden soll"
			bind:value={copiedData.value.admin.footer_text}
			on:submit={trySaveAsync}
			on:input={setUnsavedChanges}
		/>

		<Button
			classes="button-text dashboard-admin-global-submit-button"
			type={'submit'}
			ariaLabel="Klicke zum Speichern"
		>
			Speichern
		</Button>
	</form>
</SectionDashboard>

<style>
	:global(.dashboard-admin-global-section) {
		max-width: 100rem;
	}

	.dashboard-admin-global-form {
		display: flex;
		flex-direction: column;
	}

	:global(.dashboard-admin-global-submit-button) {
		margin-top: var(--2x-margin);
		align-self: center;
	}
</style>
