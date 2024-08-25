<script>
	import Year from './year.svelte';
	import { page } from '$app/stores';
	let year = $page.params.year;
</script>

<Year {year} />
