<script lang="ts">
    import type { TalkTag } from 'types/provideTypes';

    import TextLine from 'elements/text/textLine.svelte';

    import { onMount } from 'svelte';
    import { tagColorLookup, tagTextColorLookup } from 'lookup/tagColorLookup';

    export let tag: TalkTag;

    export let classes: string = '';

    onMount(() => {
        const element = document.getElementsByClassName(`schedule-entry-tag-${tag.text}`);

        Array.from(element).forEach((element) => {
            (element as HTMLElement).style.backgroundColor = tagColorLookup(tag.color_index);
            (element as HTMLElement).style.color           = tagTextColorLookup(tag.color_index);
        });
    });
</script>

<div class={classes}>
    <TextLine classes="schedule-entry-tag-{tag.text} schedule-entry-tag">
        {tag.text}
    </TextLine>
</div>

<style>
    :global(.schedule-entry-tag) {
        border-radius: var(--border-radius);
        padding:       var(--quad-padding) var(--half-padding);
    }
</style>
