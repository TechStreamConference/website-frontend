<script lang="ts">
    import type { TalkTag } from '@/types/provideTypes';

    import Tag from '@/lib/text/Tag.svelte';

    import { tag_color_lookup, tag_text_color_lookup } from '@/lookup/tagColorLookup';


    export let tag: TalkTag;
    export let classes: string = '';

</script>

<Tag {classes}
     text={tag.text}
     --tag-text-color={tag_text_color_lookup(tag.color_index)}
     --tag-background-color={tag_color_lookup(tag.color_index)}
/>
