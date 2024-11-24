<script lang="ts">
	import type { Menu } from 'types/provideTypes';

	import Tabs from 'elements/navigation/tabs.svelte';
	import Headline from 'elements/text/headline.svelte';

	const tabsEntries: Menu = [
		{
			name: 'Globals',
			url: '/dashboard/admin/globals',
			description: 'Klicke hier, um zu den globalen Einstellungen im Admin-Dashboard zu gelangen.'
		},
		{
			name: 'Events',
			url: '/dashboard/admin/events',
			description: 'Klicke hier, um zu den Event Einstellungen zu gelangen.'
		},
		{
			name: 'Validierung',
			url: '/dashboard/admin/validation',
			description: 'Klicke hier, um Daten von Speaker zu validiren.'
		}
	];
</script>

<div class="dashboard-admin">
	<Headline classes="headline-border">Admin</Headline>
	<Tabs entries={tabsEntries} />
</div>
<slot />

<style>
	.dashboard-admin {
		max-width: 100rem;
		margin: var(--2x-margin) auto 0;
	}
</style>
