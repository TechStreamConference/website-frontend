<script>
	export let data; // data from database

	import Year from './year.svelte';
	import { page } from '$app/stores';
	let displayedYear = $page.params.year;
</script>

<Year {displayedYear} currentYear = {data.currentYear}/>
