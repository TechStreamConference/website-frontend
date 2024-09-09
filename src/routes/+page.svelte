<script lang="ts">
	import type { LoadYear } from './year/[year]/year';
	export let data: LoadYear; // data from database

	import Year from './year/[year]/year.svelte';
</script>

<Year displayedYear={data.currentYear} currentYear={data.currentYear} loggedIn={data.loggedIn} />
