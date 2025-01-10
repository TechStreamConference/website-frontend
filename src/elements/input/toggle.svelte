<script lang="ts">
    import Icon from 'elements/image/icon.svelte';

    export let toggle: boolean;
    export let ariaLabel: string;
    export let iconTrue: string;
    export let iconFalse: string;

    function onToggle() {
        toggle = !toggle;
    }
</script>

<button class="toggle-button"
        type="button"
        aria-label="{ariaLabel}"
        on:click={onToggle}
>
    <Icon type={toggle ? iconTrue : iconFalse}
          color={toggle ? "green" : "red" } />
</button>

<style>
    .toggle-button {
        background: none;
        border:     none;
        cursor:     pointer;
    }
</style>
