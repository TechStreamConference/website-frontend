<script>
	import Page from './year/[year]/year.svelte';
	let currentYear = 2025; // get current year from database
</script>

<Page displayedYear={currentYear} {currentYear} />
