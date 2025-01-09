<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadAdminTimeSlots } from 'types/dashboardLoadTypes';
    import type { DashboardEvent, DashboardTimeSlot } from 'types/dashboardProvideTypes';

    import { setUnsavedChanges } from 'stores/saved';
    import { error } from '@sveltejs/kit';
    import { getTimeSlotsAsync } from './timeSlotHelper';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import NavigationDropDown from 'elements/navigation/NavigationDropDown.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
    import Button from 'elements/input/button.svelte';
    import Input from 'elements/input/input.svelte';
    import Icon from 'elements/image/icon.svelte';
    import Toggle from 'elements/input/Toggle.svelte';

    export let data: LoadAdminTimeSlots;

    function getIDFromTitle(title: string): number {
        for (const entry of data.allEvents) {
            if (entry.title === title) {
                return entry.id;
            }
        }

        console.log(`not able to look up ID for ${title}`);
        throw error(404);
    }

    function getEventFromID(id: number): DashboardEvent {
        for (const event of data.allEvents) {
            if (event.id === id) {
                return event;
            }
        }

        console.log(`not able to look up Event with ID ${id}`);
        throw error(404);
    }

    function addSlot() {
        const newSlotsData: DashboardTimeSlot = {
            event_id:   data.currentEventID,
            id:         0,
            time_start: getEventFromID(data.currentEventID).start_date + 'T00:00:00', // the start of the event is used here, as it should not be too far away from the actual date.
            duration:   0,
            is_special: false,
        };

        data.currentSlots = [
            ...data.currentSlots,
            newSlotsData,
        ];
    }

    async function updateDisplayed(value: string) {
        data.currentEventID = getIDFromTitle(value);
        data.currentSlots   = await getTimeSlotsAsync(fetch, data.currentEventID);
    }

    async function save(): Promise<boolean> {
        console.log('save');
        return true;
    }
</script>

<UnsavedChangesCallbackWrapper callback={save} />
<SectionDashboard classes="standard-dashboard-section">
    <Tabs classes="navigation-tabs-dashboard-subpage"
          entries={Menu.admin}
          entryName={MenuItem.adminEventSlots.name} />
    <NavigationDropDown id="dashboard-admin-time-slots-event-drop-down"
                        labelText="Aktuelles Event:"
                        data={data.allEvents.map(x=>x.title)}
                        on:navigated={(e) => {updateDisplayed(e.detail);}} />

    <form class="dashboard-admin-time-slots-grid"
          on:submit|preventDefault={save}>
        {#each data.currentSlots as entry, index}
            <Input
                  id="dashboard-admin-time-slot-start-date-{index}"
                  labelText="Start:"
                  type="datetime-local"
                  ariaLabel="Gib den Start des ausgewählten Slots ein."
                  bind:value={entry.time_start}
                  on:input={setUnsavedChanges}
            />
            <Input
                  id="dashboard-admin-time-slot-duration-{index}"
                  labelText="Dauer:"
                  type="number"
                  ariaLabel="Gib die Dauer des ausgewählten Slots ein."
                  bind:value={entry.duration}
                  on:input={setUnsavedChanges}
            />
            <Toggle ariaLabel="Klicke, um den special-Status des Slots zu ändern"
                    bind:toggle={entry.is_special} />
            <Button ariaLabel="Klicke, um den Slot nach oben zu verschieben"
                    buttonSize="small-button">
                <Icon type="ArrowUp" />
            </Button>
            <Button ariaLabel="Klicke, um den Slot nach unten zu verschieben"
                    buttonSize="small-button">
                <Icon type="ArrowDown" />
            </Button>
            <Button ariaLabel="Klicke, um den Slot zu löschen"
                    buttonSize="small-button">
                Löschen
            </Button>
        {/each}
    </form>
    <Button ariaLabel="Klicke, um einen neuen Time-Slot hinzuzufügen"
            on:click={addSlot}>Hinzufügen
    </Button>

</SectionDashboard>

<style>
    .dashboard-admin-time-slots-grid {
        display:               grid;
        grid-template-columns: 1fr 1fr 7rem 7rem 7rem 11rem;
        gap:                   var(--full-gap);

    }
</style>
