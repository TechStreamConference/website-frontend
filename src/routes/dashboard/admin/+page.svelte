<script lang="ts">
	import type { LoadAdmin } from 'types/loadTypes';
	export let data: LoadAdmin; // data from database

	import * as Menu from 'menu/dashboard';
	import Header from 'elements/navigation/header.svelte';
	import Footer from 'elements/navigation/footer.svelte';
	import Tabs from 'elements/navigation/tabs.svelte';

	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import TextLine from 'elements/text/textLine.svelte';

	enum Tab {
		Global = 0,
		Two = 1,
		Three = 2
	}
	let current: Tab = 0;
	function updateTabs(index: Tab): void {
		current = index;
	}
	const tabsEntries: { entry: string; callback: Function }[] = [
		{
			entry: 'Global',
			callback: () => {
				updateTabs(Tab.Global);
			}
		},
		{
			entry: 'entry 2',
			callback: () => {
				updateTabs(Tab.Two);
			}
		},
		{
			entry: 'entry 3',
			callback: () => {
				updateTabs(Tab.Three);
			}
		}
	];
</script>

<Header menu={Menu.headerIn(data.roles)} />
<div class="wrapper page-dashboard-admin">
	<div class="content">
		<HeadlinePage classes="headline">Admin</HeadlinePage>
		<Tabs entries={tabsEntries} />
		{#if current === Tab.Global}
			<TextLine>Tab 1</TextLine>
		{/if}
		{#if current === Tab.Two}
			<TextLine>Tab 2</TextLine>
		{/if}
		{#if current === Tab.Three}
			<TextLine>Tab 3</TextLine>
		{/if}
	</div>

	<Footer menu={Menu.footerIn} globals={data.globals} />
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		min-height: 100vh;
	}

	.content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.page-dashboard-admin :global(.headline) {
		margin-bottom: 3rem;
	}

	.page-dashboard-admin :global(.text) {
		margin-bottom: 5rem;
	}

	.page-dashboard-admin :global(.button) {
		margin: 0 auto;
	}
</style>
