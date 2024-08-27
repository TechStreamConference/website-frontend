<script>
	import Year from './year.svelte';
	import { page } from '$app/stores';
	let displayedYear = $page.params.year;
	let currentYear = 2025; // get current year from database
</script>

<Year {displayedYear} {currentYear}/>
