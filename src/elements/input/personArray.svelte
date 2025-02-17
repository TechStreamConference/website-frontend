<script lang="ts">
    import type { DashboardAllPersons, DashboardPerson } from 'types/dashboardProvideTypes';

    import { createEventDispatcher } from 'svelte';
    import { imageUrl } from 'helper/links';

    import Label from 'elements/text/label.svelte';
    import Tag from 'elements/text/tag.svelte';
    import Toggle from 'elements/input/toggle.svelte';
    import Icon from 'elements/image/icon.svelte';
    import Image from 'elements/image/image.svelte';

    export let labelText: string;
    export let data: DashboardAllPersons;
    export let selected: DashboardAllPersons;

    const dispatch = createEventDispatcher();

    function contains(person: DashboardPerson): boolean {
        for (const entry of selected) {
            if (entry.user_id === person.user_id) {
                return true;
            }
        }
        return false;
    }

    function updateSelected(value: boolean, person: DashboardPerson): void {
        dispatch('toggle', value);
        if (value) {
            if (contains(person)) {
                return;
            }
            selected = [
                ...selected,
                person,
            ];
            return;
        }
        selected = selected.filter(x => x.user_id !== person.user_id);
    }

    export function clear() {
        // not reset data here because this represents the provided data.
        selected = [];
    }
</script>

<Label>{labelText}</Label>
<div class="toggle-person-wrapper">
    {#each data as person}
        <Toggle classes="toggle-person-entry-wrapper"
                ariaLabel="Klicke, um mögliche Gäste an- oder abzuwählen"
                toggle={contains(person)}
                on:toggle={ (e) => { updateSelected(e.detail, person); }}>
            <Image classes="toggle-person-image"
                   alt="Profilbild von {person.name}"
                   src={imageUrl(person.photo)} />
            <div slot="slotTrue"
                 class="toggle-person-entry">
                <Icon color="green"
                      type="CircleCheck" />
                <Tag text={person.name}
                     --tag-text-color={"var(--white-color)"}
                     --tag-background-color={"var(--primary-color-dark)"}
                />
            </div>
            <div slot="slotFalse"
                 class="toggle-person-entry">
                <Icon color="red"
                      type="CircleCross" />
                <Tag text={person.name}
                     --tag-text-color="#FFF"
                     --tag-background-color="#FFFFFF00"
                />
            </div>
        </Toggle>
    {/each}
</div>
<style>
    .toggle-person-wrapper {
        display:         flex;
        flex-direction:  row;
        gap:             var(--full-gap);
        flex-wrap:       wrap;
        justify-content: center;

    }

    :global(.toggle-person-entry-wrapper) {
        background:     none;
        border:         none;
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
        align-items:    center;
        cursor:         pointer;
    }

    :global(.toggle-person-image) {
        height:        22rem;
        width:         auto;
        border:        1px solid var(--primary-color-dark);
        border-radius: var(--border-radius);
    }

    .toggle-person-entry {
        display:        flex;
        flex-direction: row;
        gap:            var(--full-gap);
        align-items:    center;
    }
</style>
