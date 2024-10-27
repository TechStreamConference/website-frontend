<script lang="ts">
	import Tabs from 'elements/navigation/tabs.svelte';
	import Headline from 'elements/text/headline.svelte';
	import type { Menu } from 'types/provideTypes';
	const tabsEntries: Menu = [
		{
			name: 'entry',
			url: '/dashboard/user/test',
			description: 'Klicke hier um zu TEST zu gelangen.'
		}
	];
</script>

<div class="dashboard-user">
	<Headline classes="headline border">User</Headline>
	<Tabs entries={tabsEntries} />
</div>
<slot />

<style>
	.dashboard-user {
		max-width: 100rem;
		margin: var(--2x-margin) auto 0;
	}
</style>
