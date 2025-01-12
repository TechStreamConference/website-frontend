<script lang="ts">
    export let toggle: boolean;
    export let ariaLabel: string;

    export let classes: string = '';

    function onToggle() {
        toggle = !toggle;
    }
</script>

<button class="toggle-button {classes}"
        type="button"
        aria-label="{ariaLabel}"
        on:click={onToggle}
>
    {#if toggle}
        <slot name="slotTrue" />
    {:else}
        <slot name="slotFalse" />
    {/if}
</button>

<style>
    .toggle-button {
        background: none;
        border:     none;
        cursor: pointer;
    }
</style>
