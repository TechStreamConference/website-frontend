<script lang="ts">
	import Input from 'elements/input/input.svelte';
	import SectionBackend from 'elements/section/sectionBackend.svelte';
	import HeadlineH2 from 'elements/text/headlineH2.svelte';
	import type { Admin } from 'types/provideTypes';

	export let data: Admin;
</script>

<SectionBackend>
	<HeadlineH2 classes="border">Globale Einstellungen</HeadlineH2>
	<Input
		classes="admin-default-year"
		id="admin-default-year"
		type="number"
		labelText="Aktuelles Jahr:"
		placeholderText="Aktuelles Jahr"
		ariaLabel="Gib das aktuelle Jahr der Internetseite ein"
		bind:value={data.default_year}
	/>
	<Input
		classes="admin-footer-description"
		id="admin-footer-description"
		type="text"
		labelText="Footer Beschreibung:"
		placeholderText="Footer Beschreibung"
		ariaLabel="Gib das Footer Beschreibung Internetseite ein"
		bind:value={data.footer_text}
	/>
</SectionBackend>
