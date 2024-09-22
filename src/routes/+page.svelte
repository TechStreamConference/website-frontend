<script lang="ts">
	import type { LoadYear } from 'types/loadTypes';
	export let data: LoadYear; // data from database

	import Year from './year/[year]/year.svelte';
</script>

<Year {data} />
