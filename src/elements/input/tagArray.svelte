<script lang="ts">
    import type { AllTalkTag, TalkTag } from 'types/provideTypes';
    import { createEventDispatcher } from 'svelte';

    import ScheduleTag from 'elements/schedule/scheduleTag.svelte';
    import Toggle from './toggle.svelte';
    import Label from 'elements/text/label.svelte';

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

<Label>{labelText}</Label>
<div class="toggle-talk-duration-wrapper">
    {#each data as tag}
        <Toggle ariaLabel="Klicke, um einen Tag aus- oder abzuwählen"
                toggle={contains(tag)}
                on:toggle={ (e) => { updateSelected(e.detail, tag); }}>
            <ScheduleTag slot="slotTrue"
                         tag={tag}
                         color={true} />
            <ScheduleTag slot="slotFalse"
                         tag={tag}
                         color={false} />
        </Toggle>
    {/each}
</div>

<style>
    .toggle-talk-duration-wrapper {
        display:         flex;
        flex-direction:  row;
        flex-wrap:       wrap;
        gap:             var(--full-gap);
        border:          1px solid var(--primary-color-dark);
        border-radius:   var(--border-radius);
        padding:         var(--full-padding);
        justify-content: space-between;
    }
</style>
