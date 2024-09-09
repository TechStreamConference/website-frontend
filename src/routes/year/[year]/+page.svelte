<script lang="ts">
	import type { LoadYear } from 'types/types';
	export let data: LoadYear; // data from database

	import Year from './year.svelte';
</script>

<Year displayedYear={data.displayedYear} currentYear={data.currentYear} loggedIn={data.loggedIn} />
