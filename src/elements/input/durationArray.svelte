<script lang="ts">
    import type { DashboardTalkDurationChoices } from 'types/dashboardProvideTypes';
    import { createEventDispatcher } from 'svelte';

    import Toggle from './toggle.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import Label from 'elements/text/label.svelte';

    export let labelText: string;
    export let data: DashboardTalkDurationChoices;
    export let selected: DashboardTalkDurationChoices;

    const dispatcher = createEventDispatcher();

    function contains(duration: number): boolean {
        for (const entry of selected) {
            if (duration === entry) {
                return true;
            }
        }
        return false;
    }

    function updateSelected(value: boolean, duration: number): void {
        dispatcher('toggle', value);
        if (value) {
            if (contains(duration)) {
                return;
            }
            selected = [
                ...selected,
                duration,
            ];
            return;
        }
        selected = selected.filter(x => x !== duration);
    }
</script>

<Label>{labelText}</Label>
<div class="toggle-talk-tag-wrapper">
    {#each data as duration}
        <Toggle ariaLabel="Klicke, um einen Tag zu aus- oder abzuwählen"
                toggle={contains(duration)}
                on:toggle={ (e) => { updateSelected(e.detail, duration); }}>
            <TextLine slot="slotTrue"
                      classes="dashboard-speaker-talk-duration dashboard-speaker-talk-duration-true">{duration}</TextLine>
            <TextLine slot="slotFalse"
                      classes="dashboard-speaker-talk-duration dashboard-speaker-talk-duration-false">{duration}</TextLine>
        </Toggle>
    {/each}
</div>

<style>
    .toggle-talk-tag-wrapper {
        display:         flex;
        flex-direction:  row;
        flex-wrap:       wrap;
        gap:             var(--full-gap);
        border:          1px solid var(--primary-color-dark);
        border-radius:   var(--border-radius);
        padding:         var(--full-padding);
        justify-content: space-between;
    }

    :global(.dashboard-speaker-talk-duration) {
        padding:       var(--full-padding);
        border-radius: var(--border-radius);
    }

    :global(.dashboard-speaker-talk-duration-true) {
        color:            var(--white-color);
        background-color: var(--primary-color-dark);
    }

    :global(.dashboard-speaker-talk-duration-false) {
        background-color: rgba(255, 255, 255, 0);
    }

</style>
