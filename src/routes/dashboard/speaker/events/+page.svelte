<script lang="ts">
	import * as Menu from 'menu/dashboard';
	import * as MenuItem from 'menu/menuItems';

	import type { LoadDashboard, LoadSpeakerTeamMemberEvent } from 'types/dashboardLoadTypes';

	import Tabs from 'elements/navigation/tabs.svelte';
	import SectionDashboard from 'elements/section/sectionDashboard.svelte';
	import DropDown from 'elements/input/dropDown.svelte';
	import Message from 'elements/text/message.svelte';

	export let data: LoadDashboard & LoadSpeakerTeamMemberEvent;
	let selected: string = data.current.title;
	let displayed: string = data.current.title;
</script>

<Tabs
	entries={Menu.speaker}
	entryName={MenuItem.speakerEvents.name}
	classes="navigation-tabs-dashboard-subpage"
/>

<SectionDashboard>
	<DropDown
		id="dashboard-speaker-event-drop-down"
		labelText="Event"
		data={data.allEvents.map((x) => x.title)}
		bind:selected
	/>
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
</SectionDashboard>
