<script lang="ts">
    import type {TalkTag} from 'types/provideTypes';

    import {isDarkStore} from "stores/theme";
    import Tag from 'elements/text/tag.svelte';

    import {tagColorLookup, tagTextColorLookup} from 'lookup/tagColorLookup';


    export let tag: TalkTag;
    export let classes: string = '';

    let textColor: number;
    let backgroundColor: number;

    $:{
        const _ = $isDarkStore; // this is necessary to make this responsive block react to the theme.
        textColor = tagTextColorLookup(tag.color_index);
        backgroundColor = tagColorLookup(tag.color_index);
    }
</script>

<Tag {classes}
     text={tag.text}
     --tag-text-color={textColor}
     --tag-background-color={backgroundColor}
/>
