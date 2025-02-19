<script lang="ts">
    import { onMount } from 'svelte';
    import { setupNavigationReload } from '../hooks.client';

    onMount(() => {
        setupNavigationReload();
    });

</script>

<slot />
