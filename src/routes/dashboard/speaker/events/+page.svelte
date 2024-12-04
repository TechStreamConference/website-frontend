<script lang="ts">
	import * as Menu from 'menu/dashboard';
	import * as MenuItem from 'menu/menuItems';

	import type { LoadDashboard, LoadSpeakerTeamMemberEvent } from 'types/dashboardLoadTypes';

	import Tabs from 'elements/navigation/tabs.svelte';
	import Image from 'elements/image/image.svelte';
	import SectionDashboard from 'elements/section/sectionDashboard.svelte';
	import DropDown from 'elements/input/dropDown.svelte';
	import Message from 'elements/text/message.svelte';
	import Input from 'elements/input/input.svelte';
	import TextArea from 'elements/input/textArea.svelte';
	import Button from 'elements/input/button.svelte';

	import { apiUrl } from 'helper/links';
	import { setUnsavedChanges } from 'stores/saved';

	export let data: LoadDashboard & LoadSpeakerTeamMemberEvent;
	let selected: string = data.current.title;
	let displayed: string = data.current.title;

	function save(): void {
		console.log('here needs to be a save function implemented');
	}
</script>

<Tabs
	entries={Menu.speaker}
	entryName={MenuItem.speakerEvents.name}
	classes="navigation-tabs-dashboard-subpage"
/>

<SectionDashboard classes="dashboard-speaker-event-section">
	<DropDown
		id="dashboard-speaker-event-drop-down"
		labelText="Event:"
		data={data.allEvents.map((x) => x.title)}
		bind:selected
	/>
	<div class="dashboard-speaker-event-message-wrapper">
		{#if data.event.is_approved}
			<Message message="Dieser Datensatz ist freigegeben" color="success" />
		{:else}
			<Message message="Dieser Datensatz muss noch freigegeben werden" />
		{/if}
		{#if data.event.requested_changes}
			<Message
				message={`Änderungswünsche:\n ${data.event.requested_changes}`}
				classes="message-pre-wrap"
			/>
		{/if}
	</div>
	<form class="dashboard-speaker-event-form" on:submit={save}>
		<Image
			alt="Dein aktuelles Profilbild"
			src={apiUrl(`/api/${data.event.photo}`)}
			classes="dashboard-speaker-events-image"
		/>
		<Input
			id="dashboard-speaker-event-name-input"
			labelText="Name:"
			placeholderText="Name"
			ariaLabel="Gib hier deinen Namen für das Event {data.current.title} ein"
			bind:value={data.event.name}
			on:input={setUnsavedChanges}
		/>
		<Input
			id="dashboard-speaker-event-short-bio-input"
			labelText="Kurzbeschreibung:"
			placeholderText="Kurzbeschreibung"
			ariaLabel="Gib hier deine Kurzbeschreibung in Stichworten für das Event {data.current
				.title} ein"
			bind:value={data.event.short_bio}
			on:input={setUnsavedChanges}
		/>
		<TextArea
			id="dashboard-speaker-event-bio-text-area"
			labelText="Beschreibung:"
			placeholderText="Beschreibung"
			ariaLabel="Gib hier deine Beschreibung für das Event {data.current.title} ein"
			bind:value={data.event.bio}
			on:input={setUnsavedChanges}
		/>
		<Button
			type="submit"
			ariaLabel="Klicke zum speichern"
			classes="button-text dashboard-speaker-event-submit-button">Speichern</Button
		>
	</form>
</SectionDashboard>

<style>
	:global(.dashboard-speaker-event-section) {
		max-width: 100rem;
		display: flex;
		flex-direction: column;
		gap: var(--full-gap);
	}
	.dashboard-speaker-event-form {
		display: flex;
		flex-direction: column;
		gap: var(--full-gap);
	}

	.dashboard-speaker-event-message-wrapper {
		margin: var(--full-margin) 0;
	}

	:global(.dashboard-speaker-events-image) {
		max-width: 30rem;
		align-self: center;
	}

	:global(.dashboard-speaker-event-submit-button) {
		margin: auto;
	}
</style>
