<script lang="ts">
	import * as Menu from 'menu/dashboard';
	import * as MenuItem from 'menu/menuItems';

	import type { LoadDashboard } from 'types/dashboardLoadTypes';

	import Headline from 'elements/text/headline.svelte';
	import Tabs from 'elements/navigation/tabs.svelte';

	export let data: LoadDashboard;
</script>

<Tabs
	entries={Menu.SectionIn(data.roles)}
	entryName={MenuItem.speaker.name}
	alignment="navigation-tabs-end"
	background="navigation-tabs-purple"
/>
<div class="dashboard-speaker">
	<Headline classes="headline-border">Speaker</Headline>
</div>
<slot />

<style>
	.dashboard-speaker {
		max-width: 100rem;
		margin: var(--2x-margin) auto 0;
	}
</style>
