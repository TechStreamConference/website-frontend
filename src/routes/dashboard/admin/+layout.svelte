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
			name: 'entry 2',
			url: '/dashboard/admin/test',
			description: 'Klicke hier, um zu TEST zu gelangen.'
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
