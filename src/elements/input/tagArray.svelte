<script lang="ts">
    import type {AllTalkTag, TalkTag} from 'types/provideTypes';
    import {createEventDispatcher} from 'svelte';

    import Tag from 'elements/text/tag.svelte';
    import Toggle from './toggle.svelte';
    import Label from 'elements/text/label.svelte';
    import Icon from 'elements/image/icon.svelte';
    import {tagColorLookup, tagTextColorLookup} from 'lookup/tagColorLookup';

    export let labelText: string;
    export let data: AllTalkTag;
    export let selected: AllTalkTag;


    const dispatcher = createEventDispatcher();

    function contains(talk: TalkTag): boolean {
        for (const entry of selected) {
            if (talk.text === entry.text) {
                return true;
            }
        }
        return false;
    }

    function updateSelected(value: boolean, tag: TalkTag): void {
        dispatcher('toggle', value);
        if (value) {
            if (contains(tag)) {
                return;
            }
            selected = [
                ...selected,
                tag,
            ];
            return;
        }
        selected = selected.filter(x => x.text !== tag.text);
    }
</script>

<div class="toggle-talk-tag-outer-wrapper">
    <Label classes="toggle-talk-tag-label">{labelText}</Label>
    <div class="toggle-talk-tag-wrapper">
        {#each data as tag}
            <Toggle ariaLabel="Klicke, um einen Tag aus- oder abzuwählen"
                    toggle={contains(tag)}
                    on:toggle={ (e) => { updateSelected(e.detail, tag); }}>
                <div slot="slotTrue"
                     class="toggle-talk-tag-entry-wrapper">
                    <Icon color="green"
                          type="CircleCheck"/>
                    <Tag text={tag.text}
                         --tag-text-color={tagTextColorLookup(tag.color_index)}
                         --tag-background-color={tagColorLookup(tag.color_index)}
                    />
                </div>
                <div slot="slotFalse"
                     class="toggle-talk-tag-entry-wrapper">
                    <Icon color="red"
                          type="CircleCross"/>
                    <Tag text={tag.text}
                         --tag-text-color="var(--text-color)"
                         --tag-background-color="#FFFFFF00"
                    />
                </div>
            </Toggle>
        {/each}
    </div>
</div>

<style>
    .toggle-talk-tag-outer-wrapper{
        position: relative;
        margin-top: var(--2x-margin);
    }

    :global(.toggle-talk-tag-label) {
        font-size: var(--half-font-size) !important;
        position: absolute;
        top: -1.5rem;
        left: 0.5rem;
        background-color: var(--background-color);
        padding: 0 var(--half-padding);
        border-radius: var(--border-radius);
    }

    .toggle-talk-tag-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--full-gap);
        border: 1px solid var(--line-color);
        border-radius: var(--border-radius);
        padding: var(--full-padding);
        justify-content: space-between;
        transition: border-radius var(--transition-duration);
    }

    .toggle-talk-tag-wrapper:hover {
        border-radius: 0;
        transition: border-radius var(--transition-duration);
    }

    .toggle-talk-tag-entry-wrapper {
        display: flex;
        flex-direction: row;
        gap: var(--full-gap);
        align-items: center;
    }
</style>
