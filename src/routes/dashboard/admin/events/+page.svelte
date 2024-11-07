<script lang="ts">
	import type { LoadAdminEvents, LoadDashboard } from 'types/dashboardLoadTypes';
	import type { DashboardEvent } from 'types/dashboardProvideTypes';

	import { Clone } from 'helper/clone';
	import { getAllEventTitle, getEventByTitle } from './eventsHelper';
	import { unsavedChanges } from 'stores/saved';
	import { onMount } from 'svelte';

	import TextLine from 'elements/text/textLine.svelte';
	import SaveMessage from 'elements/text/saveMessage.svelte';
	import SectionDashboard from 'elements/section/sectionDashboard.svelte';
	import DropDown from 'elements/input/dropDown.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';

	export let data: LoadDashboard & LoadAdminEvents;
	let copiedData = new Clone<LoadDashboard & LoadAdminEvents>(data);
	let message: SaveMessage;
	let selected: string;
	let displayed: string;
	let currentEvent: DashboardEvent;

	onMount(() => {
		updateDisplayed();
	});

	function updateDisplayed(): void {
		if (unsavedChanges()) {
			console.log('unsaved changes');
			selected = displayed;
			return;
		}

		displayed = selected;
		currentEvent = getEventByTitle(copiedData.value.allEvents, displayed);
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
			on:input={updateDisplayed}
		/>
		{#if displayed && currentEvent}
			<SubHeadline classes="dashboard-admin-event-event-subheadline"
				>{currentEvent.title}</SubHeadline
			>
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
