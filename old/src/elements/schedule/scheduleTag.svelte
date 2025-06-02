<script lang="ts">
    import type { TalkTag } from 'types/provideTypes';

    import Tag from 'elements/text/tag.svelte';

    import { tagColorLookup, tagTextColorLookup } from 'lookup/tagColorLookup';


    export let tag: TalkTag;
    export let classes: string = '';

</script>

<Tag {classes}
     text={tag.text}
     --tag-text-color={tagTextColorLookup(tag.color_index)}
     --tag-background-color={tagColorLookup(tag.color_index)}
/>
