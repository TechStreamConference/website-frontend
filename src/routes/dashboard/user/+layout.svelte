<script lang="ts">
	import Tabs from 'elements/navigation/tabs.svelte';
	import Headline from 'elements/text/headline.svelte';
	import type { Menu } from 'types/provideTypes';
	const tabsEntries: Menu = [
		{
			name: 'Newsletter',
			url: '/dashboard/user/newsletter',
			description: 'Klicke hier um die Newsletter abonieren zu können.'
		}
	];
</script>

<div class="dashboard-user">
	<Headline classes="headline-border">User</Headline>
	<Tabs entries={tabsEntries} />
</div>
<slot />

<style>
	.dashboard-user {
		max-width: 100rem;
		margin: var(--2x-margin) auto 0;
	}
</style>
