<script lang="ts">
	import type { LoadYear } from 'types/types';
	export let data: LoadYear; // data from database

	import Year from './year/[year]/year.svelte';
</script>

<Year displayedYear={data.currentYear} currentYear={data.currentYear} loggedIn={data.loggedIn} />
