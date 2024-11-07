<script lang="ts">
	import type { LoadAdminEvents, LoadDashboard } from 'types/dashboardLoadTypes';
	import type { DashboardEvent } from 'types/dashboardProvideTypes';

	import { Clone } from 'helper/clone';
	import { getAllEventTitle, getEventByTitle } from './eventsHelper';
	import { unsavedChanges, setUnsavedChanges } from 'stores/saved';
	import { onMount } from 'svelte';

	import TextLine from 'elements/text/textLine.svelte';
	import SaveMessage from 'elements/text/saveMessage.svelte';
	import SectionDashboard from 'elements/section/sectionDashboard.svelte';
	import DropDown from 'elements/input/dropDown.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';
	import Input from 'elements/input/input.svelte';
	import TextArea from 'elements/input/textArea.svelte';
	import Button from 'elements/input/button.svelte';

	export let data: LoadDashboard & LoadAdminEvents;
	let copiedData = new Clone<LoadDashboard & LoadAdminEvents>(data);
	let message: SaveMessage;
	let selected: string;
	let displayed: string;
	let currentEvent: DashboardEvent;

	onMount(() => {
		updateDisplayed();
	});

	$: if (selected) {
		// when selected changes this gets called
		if (displayed !== selected) {
			updateDisplayed();
		}
	}

	function updateDisplayed(): void {
		if (unsavedChanges()) {
			console.log('unsaved changes');
			resetSelected();
			selected = displayed;
			return;
		}

		displayed = selected;
		currentEvent = getEventByTitle(copiedData.value.allEvents, displayed);
	}

	function resetSelected(): void {
		selected = displayed;
	}

	async function trySaveAsync(): Promise<void> {
		console.log('todo: save data');
	}
</script>

<SectionDashboard classes="dashboard-admin-event-section">
	<SaveMessage bind:this={message} />
	{#if copiedData.value.allEvents}
		<DropDown
			data={getAllEventTitle(copiedData.value.allEvents)}
			bind:selected
			id={'dashboard-admin-event-drop-down'}
			labelText="Aktuelles Event:"
		/>
		{#if displayed && currentEvent}
			<SubHeadline classes="dashboard-admin-event-event-subheadline"
				>{currentEvent.title}</SubHeadline
			>
			<form class="dashboard-admin-event-form" on:submit|preventDefault={trySaveAsync}>
				<Input
					classes="dashboard-admin-event-title input"
					id="dashboard-admin-event-title"
					labelText="Titel:"
					placeholderText="Titel"
					ariaLabel="Gib den Titel des ausgewählten Events ein."
					bind:value={currentEvent.title}
					on:submit={trySaveAsync}
					on:input={setUnsavedChanges}
				/>
				<Input
					classes="dashboard-admin-event-sub-title input"
					id="dashboard-admin-event-sub-title"
					labelText="Untertitel:"
					placeholderText="Untertitel"
					ariaLabel="Gib den Untertitel des ausgewählten Events ein."
					bind:value={currentEvent.subtitle}
					on:submit={trySaveAsync}
					on:input={setUnsavedChanges}
				/>
				<Input
					classes="dashboard-admin-event-description-headline input"
					id="dashboard-admin-event-description-headline"
					labelText="Überschrift Beschreibung:"
					placeholderText="Überschrift Beschreibung:"
					ariaLabel="Gib die Überschrift der Eventbeschreibung des ausgewählten Events ein."
					bind:value={currentEvent.description_headline}
					on:submit={trySaveAsync}
					on:input={setUnsavedChanges}
				/>
				<TextArea
					classes="dashboard-admin-event-description input"
					id="dashboard-admin-event-description"
					labelText="Beschreibung:"
					placeholderText="Beschreibung"
					ariaLabel="Gib den Eventbeschreibungstext des ausgewählten Events ein."
					bind:value={currentEvent.description}
					on:submit={trySaveAsync}
					on:input={setUnsavedChanges}
				/>
				<Input
					classes="dashboard-admin-event-twitch-url input"
					id="dashboard-admin-event-twitch-url"
					labelText="Twitch URL:"
					placeholderText="Twitch URL:"
					ariaLabel="Gib die URL der Twitchseite des ausgewählten Events ein."
					bind:value={currentEvent.twitch_url}
					on:submit={trySaveAsync}
					on:input={setUnsavedChanges}
				/>
				<Input
					classes="dashboard-admin-event-discord-url input"
					id="dashboard-admin-event-discord-url"
					labelText="Discord URL:"
					placeholderText="Discord URL:"
					ariaLabel="Gib die URL des Discordservers des ausgewählten Events ein."
					bind:value={currentEvent.discord_url}
					on:submit={trySaveAsync}
					on:input={setUnsavedChanges}
				/>
				<Input
					classes="dashboard-admin-event-presskit-url input"
					id="dashboard-admin-event-presskit-url"
					labelText="Presskit URL:"
					placeholderText="Presskit URL:"
					ariaLabel="Gib die URL des Presskits des ausgewählten Events ein."
					bind:value={currentEvent.presskit_url}
					on:submit={trySaveAsync}
					on:input={setUnsavedChanges}
				/>
				<Input
					classes="dashboard-admin-event-youtube-trailer-id input"
					id="dashboard-admin-event-youtube-trailer-id"
					labelText="YouTube Trailer ID:"
					placeholderText="YouTube Trailer ID:"
					ariaLabel="Gib die ID des YouTube Trailer des ausgewählten Events ein."
					bind:value={currentEvent.trailer_youtube_id}
					on:submit={trySaveAsync}
					on:input={setUnsavedChanges}
				/>

				<Button
					classes="button-text dashboard-admin-event-submit-button"
					type={'submit'}
					ariaLabel="Klicke zum Speichern"
				>
					Speichern
				</Button>
			</form>
		{:else}
			<TextLine>Kein aktuelles Event</TextLine>
		{/if}
	{:else}
		<TextLine>Keine Events</TextLine>
	{/if}
</SectionDashboard>

<style>
	:global(.dashboard-admin-event-section) {
		max-width: 100rem;
	}

	:global(.dashboard-admin-event-event-subheadline) {
		justify-self: center;
		margin-top: var(--2x-margin);
	}
</style>
