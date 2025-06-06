<script lang="ts">
    export let classes: string = '';
</script>

<ul class={classes}>
    <slot />
</ul>

<style>
    .list-padding-left {
        padding-left: var(--2x-padding);
    }
</style>
