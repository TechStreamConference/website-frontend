<script lang="ts">
	import * as Menu from 'menu/dashboard';
	import * as MenuItem from 'menu/menuItems';

	import type { LoadDashboard, LoadSpeakerTeamMemberEvent } from 'types/dashboardLoadTypes';
	import type { SetSpeakerTeamMemberEvent } from 'types/dashboardSetTypes';

	import Tabs from 'elements/navigation/tabs.svelte';
	import Image from 'elements/image/image.svelte';
	import SectionDashboard from 'elements/section/sectionDashboard.svelte';
	import DropDown from 'elements/input/dropDown.svelte';
	import Message from 'elements/text/message.svelte';
	import Input from 'elements/input/input.svelte';
	import TextArea from 'elements/input/textArea.svelte';
	import Button from 'elements/input/button.svelte';
	import ManualUnsavedChangesPopup from 'elements/navigation/manualUnsavedChangesPopup.svelte';
	import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
	import SaveMessage from 'elements/text/saveMessage.svelte';

	import { apiUrl } from 'helper/links';
	import { resetUnsavedChanges, setUnsavedChanges, unsavedChanges } from 'stores/saved';
	import { onDestroy } from 'svelte';
	import { loadSpecificEvent } from './loads';
	import { SaveMessageType } from 'types/saveMessageType';

	export let data: LoadDashboard & LoadSpeakerTeamMemberEvent;
	let selected: string = data.current.title;
	let displayed: string = data.current.title;

	let manualPopup: ManualUnsavedChangesPopup;
	let imageInput: Input;
	let saveMessage: SaveMessage;

	let imageFile: File | undefined = undefined;
	let imagePreviewURL: string | undefined = undefined;

	$: {
		if (selected) {
			if (selected !== displayed) {
				updateDisplayedAsync();
			}
		}
	}

	function navigate(): void {
		updateDisplayedAsync();
	}
	function stay(): void {
		selected = displayed;
	}

	async function updateDisplayedAsync(): Promise<void> {
		if (unsavedChanges()) {
			manualPopup.show();
			return;
		}

		for (var entry of data.allEvents) {
			if (entry.title === selected) {
				data.current = entry;
				break;
			}
		}

		displayed = data.current.title;

		data.event = await loadSpecificEvent(fetch, data.current.event_id);
		resetImage();
	}

	async function trySaveAsync(): Promise<boolean> {
		const toSave: SetSpeakerTeamMemberEvent = {
			name: data.event.name,
			short_bio: data.event.short_bio,
			bio: data.event.bio
		};

		if (import.meta.env.DEV) {
			console.log(toSave);
		}

		const response: Response = await fetch(
			apiUrl(`/api/dashboard/speaker/event/${data.current.event_id}`),
			{
				method: 'POST',
				body: JSON.stringify(toSave)
			}
		);

		if (response.ok) {
			resetUnsavedChanges();
			saveMessage.setSaveMessage(SaveMessageType.Save);
			return true;
		}

		if (import.meta.env.DEV) {
			console.error(await response.json());
		}

		saveMessage.setSaveMessage(SaveMessageType.Error);

		return false;
	}

	function changeImage(event: Event): void {
		const previewCleanup: Function = () => {
			if (imagePreviewURL) {
				URL.revokeObjectURL(imagePreviewURL);
				imagePreviewURL = undefined;
			}
		};
		const cleanup: Function = () => {
			previewCleanup();
			imageFile = undefined;
		};

		if (!event.target) {
			cleanup();
			return;
		}
		const input = event.target as HTMLInputElement;

		if (!input.files || !input.files[0]) {
			cleanup();
			return;
		}

		imageFile = input.files[0];
		previewCleanup();
		if (imageFile) {
			imagePreviewURL = URL.createObjectURL(imageFile);
		}
	}

	function resetImage(): void {
		imageFile = undefined;
		if (imagePreviewURL) {
			URL.revokeObjectURL(imagePreviewURL);
			imagePreviewURL = undefined;
		}
		imageInput.clear();
	}

	onDestroy(() => {
		if (imagePreviewURL) {
			URL.revokeObjectURL(imagePreviewURL);
			imagePreviewURL = undefined;
		}
	});
</script>

<Tabs
	entries={Menu.speaker}
	entryName={MenuItem.speakerEvents.name}
	classes="navigation-tabs-dashboard-subpage"
/>
<UnsavedChangesCallbackWrapper callback={trySaveAsync} />
<ManualUnsavedChangesPopup
	bind:this={manualPopup}
	navigateCallback={navigate}
	stayCallback={stay}
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
		<SaveMessage bind:this={saveMessage} />
	</div>
	<form class="dashboard-speaker-event-form" on:submit|preventDefault={trySaveAsync}>
		{#if imagePreviewURL}
			<Image
				alt="Dein neues Speaker-Bild für das Event {data.current.title}"
				src={imagePreviewURL}
				classes="dashboard-speaker-events-image"
			/>
		{:else}
			<Image
				alt="Dein aktuelles Speaker-Bild für das Event {data.current.title}"
				src={apiUrl(`/api/${data.event.photo}`)}
				classes="dashboard-speaker-events-image"
			/>
		{/if}
		<Input
			bind:this={imageInput}
			id="dashboard-speaker-event-image-input"
			labelText="Bild:"
			placeholderText="Bild"
			ariaLabel="Lade hier dein Bild für das Event {data.current.title} hoch"
			type="file"
			on:input={(event) => {
				setUnsavedChanges();
				changeImage(event);
			}}
			value={imageFile}
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
		max-height: 30rem;
		align-self: center;
	}

	:global(.dashboard-speaker-event-submit-button) {
		margin: auto;
	}
</style>
