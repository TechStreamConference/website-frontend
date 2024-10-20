<script lang="ts">
	export let data: Admin;

	import type { Admin } from 'types/provideTypes';

	import HeadlineH2 from 'elements/text/headlineH2.svelte';
	import SectionBackend from 'elements/section/sectionBackend.svelte';

	import Button from 'elements/input/button.svelte';
	import Input from 'elements/input/input.svelte';

	async function trySave(): Promise<void> {
		console.log('try save');
	}
</script>

<SectionBackend>
	<HeadlineH2 classes="border">Globale Einstellungen</HeadlineH2>
	<form class="width-wrapper global-admin-form" on:submit|preventDefault={trySave}>
		<Input
			classes="admin-default-year input"
			id="admin-default-year"
			type="number"
			labelText="Aktuelles Jahr:"
			placeholderText="Aktuelles Jahr"
			ariaLabel="Gib das aktuelle Jahr der Internetseite ein"
			bind:value={data.default_year}
		/>
		<Input
			classes="admin-footer-description input"
			id="admin-footer-description"
			type="text"
			labelText="Footer Beschreibung:"
			placeholderText="Footer Beschreibung"
			ariaLabel="Gib das Footer Beschreibung Internetseite ein"
			bind:value={data.footer_text}
		/>

		<Button classes="text submit-button" type={'submit'} ariaLabel="Klicke zum Registrieren">
			Speichern
		</Button>
	</form>
</SectionBackend>

<style>
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
