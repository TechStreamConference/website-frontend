<script lang="ts">
	import type { LoadAdminEvents, LoadDashboard } from 'types/dashboardLoadTypes';
	import type { DashboardEvent } from 'types/dashboardProvideTypes';
	import type { SetAdminEvent } from 'types/dashboardSetTypes';
	import type { SaveMessageType } from 'types/saveMessageType';

	import { onMount } from 'svelte';
	import { Clone } from 'helper/clone';
	import { isSaveType } from 'types/saveMessageType';
	import { getAllEventTitle, getEventByTitle, validateData } from './eventsHelper';
	import { unsavedChanges, setUnsavedChanges } from 'stores/saved';
	import { convertTimeAndDateToHTML, convertTimeAndDateToSQL } from 'helper/dates';
	import { trySaveDashboardDataAsync } from 'helper/trySaveDashboardData';

	import TextLine from 'elements/text/textLine.svelte';
	import SaveMessage from 'elements/text/saveMessage.svelte';
	import SectionDashboard from 'elements/section/sectionDashboard.svelte';
	import DropDown from 'elements/input/dropDown.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';
	import Input from 'elements/input/input.svelte';
	import TextArea from 'elements/input/textArea.svelte';
	import Button from 'elements/input/button.svelte';
	import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
	import ManualUnsavedChangesPopup from 'elements/navigation/manualUnsavedChangesPopup.svelte';

	export let data: LoadDashboard & LoadAdminEvents;
	let manualPopup: ManualUnsavedChangesPopup;

	let copiedData = new Clone<LoadDashboard & LoadAdminEvents>(data);

	let message: SaveMessage;
	let selected: string;
	let displayed: string;

	let currentEvent: DashboardEvent;

	function navigate(): void {
		updateDisplayed();
	}
	function stay(): void {
		resetSelected();
		selected = displayed;
	}

	onMount(() => {
		updateDisplayed();
	});

	$: if (selected) {
		if (displayed !== selected) {
			updateDisplayed();
		}
	}

	function updateDisplayed(): void {
		if (unsavedChanges()) {
			manualPopup.show();
			return;
		}

		displayed = selected;
		currentEvent = getEventByTitle(copiedData.value.allEvents, displayed);
		currentEvent.publish_date = convertTimeAndDateToHTML(currentEvent.publish_date);
		currentEvent.schedule_visible_from = convertTimeAndDateToHTML(
			currentEvent.schedule_visible_from
		);
	}

	function resetSelected(): void {
		selected = displayed;
	}

	async function trySaveAsync(): Promise<boolean> {
		const toSave: SetAdminEvent = structuredClone(currentEvent);
		toSave.publish_date = convertTimeAndDateToSQL(toSave.publish_date);
		toSave.schedule_visible_from = convertTimeAndDateToSQL(toSave.schedule_visible_from);
		toSave.start_date = toSave.start_date;
		toSave.end_date = toSave.end_date;

		console.log(toSave);

		validateData(toSave);

		const saveType: SaveMessageType = await trySaveDashboardDataAsync<SetAdminEvent>(
			toSave,
			`/api/dashboard/admin/event/${toSave.id}`
		);

		message.setSaveMessage(saveType);
		return isSaveType(saveType);
	}
</script>

<UnsavedChangesCallbackWrapper callback={trySaveAsync} />
<ManualUnsavedChangesPopup
	bind:this={manualPopup}
	navigateCallback={navigate}
	stayCallback={stay}
/>
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
				<div class="dashboard-admin-event-time-date-wrapper">
					<Input
						classes="dashboard-admin-event-start-date input"
						id="dashboard-admin-event-start-date"
						labelText="Start Datum:"
						placeholderText="Start Datum:"
						type="date"
						ariaLabel="Gib das Start Datum des ausgewählten Events ein."
						bind:value={currentEvent.start_date}
						on:submit={trySaveAsync}
						on:input={setUnsavedChanges}
					/>
					<Input
						classes="dashboard-admin-event-end-date input"
						id="dashboard-admin-event-end-date"
						labelText="End Datum:"
						placeholderText="End Datum:"
						type="date"
						ariaLabel="Gib das End Datum des ausgewählten Events ein."
						bind:value={currentEvent.end_date}
						on:submit={trySaveAsync}
						on:input={setUnsavedChanges}
					/>
				</div>
				<div class="dashboard-admin-event-time-date-wrapper">
					<Input
						classes="dashboard-admin-event-publish-event-date input"
						id="dashboard-admin-event-publish-event-date"
						labelText="Veröffentlichungsdatum Event:"
						placeholderText="Veröffentlichungsdatum Event:"
						type="datetime-local"
						ariaLabel="Gib das Veröffentlichungsdatum des ausgewählten Events ein."
						bind:value={currentEvent.publish_date}
						on:submit={trySaveAsync}
						on:input={setUnsavedChanges}
					/>
					<Input
						classes="dashboard-admin-event-publish-shedule-date input"
						id="dashboard-admin-event-publish-shedule-date"
						labelText="Veröffentlichungsuhrzeit Ablaufplan:"
						placeholderText="Veröffentlichungsuhrzeit Ablaufplan:"
						type="datetime-local"
						ariaLabel="Gib das Veröffentlichungsuhrzeit des Ablaufplanes des ausgewählten Events ein."
						bind:value={currentEvent.schedule_visible_from}
						on:submit={trySaveAsync}
						on:input={setUnsavedChanges}
					/>
				</div>
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
		margin-top: var(--4x-margin);
	}

	.dashboard-admin-event-form {
		display: flex;
		flex-direction: column;
		gap: var(--full-gap);
	}

	.dashboard-admin-event-time-date-wrapper {
		display: flex;
		flex-direction: row;
		gap: var(--full-gap);
	}

	:global(.dashboard-admin-event-submit-button) {
		margin-top: var(--2x-margin);
		align-self: center;
	}
</style>
