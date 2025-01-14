<script lang="ts">
    import type { DashboardTalkDurationChoices } from 'types/dashboardProvideTypes';
    import { createEventDispatcher } from 'svelte';

    import Toggle from './toggle.svelte';
    import Label from 'elements/text/label.svelte';
    import Tag from 'elements/text/tag.svelte';

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
<div class="toggle-talk-duration-wrapper">
    {#each data as duration}
        <Toggle ariaLabel="Klicke, um einen mögliche Talk-Dauer in Minuten aus- oder abzuwählen"
                toggle={contains(duration)}
                on:toggle={ (e) => { updateSelected(e.detail, duration); }}>
            <Tag slot="slotTrue"
                 text={duration.toString()}
                 --tag-text-color={"var(--white-color)"}
                 --tag-background-color={"var(--primary-color-dark)"}
            />
            <Tag slot="slotFalse"
                 text={duration.toString()}
                 --tag-text-color="#FFF"
                 --tag-background-color="#FFFFFF00"
            />
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
