<script lang="ts">
	import type { LoadAdminEvents, LoadDashboard } from 'types/dashboardLoadTypes';

	import { Clone } from 'helper/clone';
	import { getDropDownKeys } from './eventsHelper';

	import TextLine from 'elements/text/textLine.svelte';
	import SaveMessage from 'elements/text/saveMessage.svelte';
	import SectionDashboard from 'elements/section/sectionDashboard.svelte';
	import DropDown from 'elements/input/dropDown.svelte';

	export let data: LoadDashboard & LoadAdminEvents;
	let copiedData = new Clone<LoadDashboard & LoadAdminEvents>(data);
	let message: SaveMessage;
	let selected: string;
</script>

<SectionDashboard classes="dashboard-admin-event-section">
	<SaveMessage bind:this={message} />
	{#if copiedData.value.allEvents}
		<DropDown
			data={getDropDownKeys(copiedData.value.allEvents)}
			bind:selected
			id={'dashboard-admin-event-drop-down'}
			labelText="Aktuelles Event:"
		/>
	{:else}
		<TextLine>No current Event</TextLine>
	{/if}
</SectionDashboard>

<style>
	:global(.dashboard-admin-event-section) {
		max-width: 100rem;
	}
</style>
