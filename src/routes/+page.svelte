<script lang="ts">
    import type { LoadYear } from 'types/loadTypes';

    export let data: LoadYear; // data from database

    import Year from 'pages/year.svelte';
</script>

<Year {data} />
