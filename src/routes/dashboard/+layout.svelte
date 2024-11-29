<script lang="ts">
	import type { LoadDashboard } from 'types/dashboardLoadTypes';

	import * as Menu from 'menu/dashboard';
	import Header from 'elements/navigation/header.svelte';
	import Footer from 'elements/navigation/footer.svelte';
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

	.dashboard-content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}
</style>
