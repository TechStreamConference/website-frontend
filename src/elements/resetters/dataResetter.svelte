<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { dashboardValue, setDashboardValue, unsetDashboardValue } from 'stores/dashboard';
	import { onMount } from 'svelte';

	export let data: any;

	onMount(() => {
		setDashboardValue(data);
	});

	afterNavigate(() => {
		data = dashboardValue();
		unsetDashboardValue();
	});
</script>
