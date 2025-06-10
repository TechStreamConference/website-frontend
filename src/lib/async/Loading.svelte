<script lang="ts">

    import {fade} from "svelte/transition";
    import {apply_theme} from "@/helper/theme";

    let loading = true;

    apply_theme('system', false);

    export function mark_loaded(): void {
        loading = false;
    }
</script>

{#if loading}
    <div class="global-loading-wrapper">
        <h1>Loading...</h1>
    </div>
{:else}
    <div class="global-loading-wrapper" transition:fade={{duration:100}}>
        <slot/>
    </div>
{/if}

<style>
    .global-loading-wrapper {
        height: 100vh;
        width: 100vw;
        background-color: var(--background-color);
    }
</style>
