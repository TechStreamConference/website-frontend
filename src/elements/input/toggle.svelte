<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    export let toggle: boolean;
    export let ariaLabel: string;
    export let classes: string = '';

    const dispatcher = createEventDispatcher();

    function onToggle() {
        toggle = !toggle;
        dispatcher('toggle', toggle);
    }
</script>

<button class="toggle-button {classes}"
        type="button"
        aria-label="{ariaLabel}"
        on:click={onToggle}
>
    <slot/>
    {#if toggle}
        <slot name="slotTrue"/>
    {:else}
        <slot name="slotFalse"/>
    {/if}
</button>

<style>
    .toggle-button {
        background: none;
        border: none;
        cursor: pointer;
    }
</style>
