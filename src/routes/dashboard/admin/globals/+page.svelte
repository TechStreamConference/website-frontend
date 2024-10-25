<script lang="ts">
	import type { LoadDashboard, LoadAdmin } from 'types/loadTypes.js';

	export let data: LoadDashboard & LoadAdmin; // data from database
	let copiedData: LoadDashboard & LoadAdmin = structuredClone(data); // copied data from database to not save original data until save

	import { apiUrl } from 'helper/links';

	import SectionDashboard from 'elements/section/sectionDashboard.svelte';

	import Button from 'elements/input/button.svelte';
	import Input from 'elements/input/input.svelte';
	import Message from 'elements/text/message.svelte';
	import TextArea from 'elements/input/textArea.svelte';
	import DropDown from 'elements/input/dropDown.svelte';
	import { resetUnsavedChanges, setUnsavedChanges } from 'stores/saved';

	let errorMessage: string = '';
	let successMessage: string = '';
	let successTimer: number | null = null;


	async function trySaveAsync(): Promise<void> {
		if (successTimer) {
			clearTimeout(successTimer);
		}
		const response: Response = await fetch(apiUrl('/api/dashboard/admin/globals'), {
			method: 'PUT',
			body: JSON.stringify(copiedData.admin)
		});

		if (response.ok) {
			successMessage = 'Gespeichert';
			errorMessage = '';
			setTimeout(() => {
				resetSuccessMessage();
			}, 3000);
			data = structuredClone(copiedData);
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
	<Message classes="success-color" message={successMessage} />
	<form class="width-wrapper global-admin-form" on:submit|preventDefault={trySaveAsync}>
		<DropDown
			id="admin-default-year2"
			labelText="Aktuelles Jahr:"
			data={copiedData.globals.years_with_events}
			bind:selected={copiedData.admin.default_year}
			on:submit={trySaveAsync}
			on:input={setUnsavedChanges}
		/>
		<TextArea
			classes="admin-footer-description input"
			id="admin-footer-description"
			labelText="Footer Beschreibung:"
			placeholderText="Footer Beschreibung"
			ariaLabel="Gib den Text ein, der im Footer der Internetseite angezeigt werden soll"
			bind:value={copiedData.admin.footer_text}
			on:submit={trySaveAsync}
			on:input={setUnsavedChanges}
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
