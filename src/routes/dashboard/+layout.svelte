<script lang="ts">
	import type { LoadDashboard } from 'types/loadTypes';
	export let data: LoadDashboard; // data from database

	import * as Menu from 'menu/dashboard';
	import Header from 'elements/navigation/header.svelte';
	import Footer from 'elements/navigation/footer.svelte';
	import Tabs from 'elements/navigation/tabs.svelte';
</script>

<Header menu={Menu.headerIn} />
<div class="wrapper page-dashboard-user">
	<div class="section-wrapper">
		<div class="section-spacer" />
		<Tabs classes="page-dashboard-admin-section-navigation" entries={Menu.SectionIn(data.roles)} />
	</div>
	<div class="content">
		<slot />
	</div>

	<Footer menu={Menu.footerIn} globals={data.globals} />
</div>

<style>
	.section-wrapper {
		margin-top: 4rem;
		display: flex;
		flex-direction: row;
		justify-content: end;
	}

	.section-spacer {
		flex-grow: 1;
	}

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

	.page-dashboard-user :global(.headline) {
		margin-bottom: 3rem;
	}

	.page-dashboard-user :global(.text) {
		margin-bottom: 5rem;
	}

	.page-dashboard-user :global(.button) {
		margin: 0 auto;
	}
</style>
