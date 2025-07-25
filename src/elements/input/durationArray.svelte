<script lang="ts">
    import type {DashboardTalkDurationChoices} from 'types/dashboardProvideTypes';
    import {createEventDispatcher} from 'svelte';

    import Toggle from './toggle.svelte';
    import Label from 'elements/text/label.svelte';
    import Tag from 'elements/text/tag.svelte';
    import Icon from 'elements/image/icon.svelte';

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

<div class="toggle-talk-duration-outer-wrapper">
    <Label classes="toggle-talk-duration-label">{labelText}</Label>
    <div class="toggle-talk-duration-wrapper">
        {#each data as duration}
            <Toggle ariaLabel="Klicke, um eine mögliche Talk-Dauer in Minuten aus- oder abzuwählen"
                    toggle={contains(duration)}
                    on:toggle={ (e) => { updateSelected(e.detail, duration); }}>
                <div slot="slotTrue"
                     class="toggle-talk-duration-entry-wrapper">
                    <Icon color="green"
                          type="CircleCheck"/>
                    <Tag text={duration.toString()}
                         --tag-text-color={"var(--white-color)"}
                         --tag-background-color={"var(--primary-color-dark)"}
                    />
                </div>
                <div slot="slotFalse"
                     class="toggle-talk-duration-entry-wrapper">
                    <Icon color="red"
                          type="CircleCross"/>
                    <Tag text={duration.toString()}
                         --tag-text-color="var(--text-color)"
                         --tag-background-color="#FFFFFF00"
                    />
                </div>
            </Toggle>
        {/each}
    </div>
</div>

<style>
    .toggle-talk-duration-outer-wrapper {
        position: relative;
        margin-top: var(--2x-margin);
    }

    :global(.toggle-talk-duration-label) {
        font-size: var(--half-font-size) !important;
        position: absolute;
        top: -1.5rem;
        left: 0.5rem;
        background-color: var(--background-color);
        padding: 0 var(--half-padding);
        border-radius: var(--border-radius);
    }

    .toggle-talk-duration-wrapper {
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

    .toggle-talk-duration-wrapper:hover {
        border-radius: 0;
        transition: border-radius var(--transition-duration);
    }

    .toggle-talk-duration-entry-wrapper {
        display: flex;
        flex-direction: row;
        gap: var(--full-gap);
        align-items: center;
    }
</style>
