<script lang="ts">
    import TextLine from 'elements/text/textLine.svelte';

    export let classes: string = '';
    export let text: string;
</script>

<div class={classes}>
    <TextLine classes="schedule-entry-tag">
        {text}
    </TextLine>
</div>

<style>
    :global(.schedule-entry-tag) {
        border-radius: var(--border-radius);
        padding: var(--quad-padding) var(--half-padding);
        color: var(--tag-text-color);
        background-color: var(--tag-background-color);
    }
</style>
