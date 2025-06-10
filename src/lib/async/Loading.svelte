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
    <div class="global-loading-wrapper" in:fade={{duration:300}}>
        <slot/>
    </div>
{/if}

<style>
    .global-loading-wrapper {
        height: auto;
        width: auto;
        background-color: var(--background-color);
    }
</style>
