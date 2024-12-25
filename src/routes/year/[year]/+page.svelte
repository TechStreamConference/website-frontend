<script lang="ts">
    import type { LoadYear } from 'types/loadTypes';

    export let data: LoadYear; // data from database

    import Year from './year.svelte';
</script>

<Year {data} />
