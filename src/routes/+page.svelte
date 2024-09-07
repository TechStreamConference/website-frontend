<script>
	import Year from './year/[year]/year.svelte';
	let currentYear = 2025; // get current year from database
</script>

<Year displayedYear={currentYear} {currentYear} />
