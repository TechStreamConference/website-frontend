<script lang="ts">
	import type { LoadDashboard } from 'types/loadTypes';

	import * as Menu from 'menu/dashboard';
	import Header from 'elements/navigation/header.svelte';
	import Footer from 'elements/navigation/footer.svelte';
	import Tabs from 'elements/navigation/tabs.svelte';
	import UnsavedChangesPopup from 'elements/navigation/unsavedChangesPopup.svelte';

	import { onMount } from 'svelte';
	import { unsavedChanges, resetUnsavedChanges } from 'stores/saved';

	export let data: LoadDashboard; // data from database

	onMount(() => {
		resetUnsavedChanges();
		window.addEventListener('beforeunload', (event) => {
			if (unsavedChanges()) {
				event.preventDefault();
			}
		});
	});
</script>

<UnsavedChangesPopup />
<Header menu={Menu.headerIn} />
<div class="dashboard-wrapper">
	<div class="dashboard-section-wrapper">
		<Tabs
			alignment="navigation-tabs-end"
			entries={Menu.SectionIn(data.roles)}
			background="navigation-tabs-purple"
			color="white"
		/>
	</div>
	<div class="dashboard-content">
		<slot />
	</div>

	<Footer menu={Menu.footerIn} globals={data.globals} />
</div>

<style>
    .dashboard-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
        min-height: 100vh;
    }

	.dashboard-section-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: end;
	}

	.dashboard-content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}
</style>
