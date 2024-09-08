<script>
	export let data; // data from database

	import Year from './year/[year]/year.svelte';
</script>

<Year displayedYear={data.currentYear} currentYear={data.currentYear} loggedIn={data.loggedIn} />
