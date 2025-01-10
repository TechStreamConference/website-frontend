<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadAdminTimeSlots } from 'types/dashboardLoadTypes';
    import type { DashboardEvent, DashboardTimeSlot } from 'types/dashboardProvideTypes';

    import { resetUnsavedChanges, setUnsavedChanges, unsavedChanges } from 'stores/saved';
    import { error } from '@sveltejs/kit';
    import { getTimeSlotsAsync } from './timeSlotHelper';
    import { trySaveDashboardDataAsync } from 'helper/trySaveDashboardData';
    import { isSuccessType } from 'types/saveMessageType';
    import { checkSQLTimeAndDate, convertTimeAndDateToSQL } from 'helper/dates';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
    import Button from 'elements/input/button.svelte';
    import Input from 'elements/input/input.svelte';
    import Icon from 'elements/image/icon.svelte';
    import Toggle from 'elements/input/toggle.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import Message from 'elements/text/message.svelte';
    import Tooltip from 'elements/text/tooltip.svelte';
    import DropDown from 'elements/input/dropDown.svelte';

    export let data: LoadAdminTimeSlots;

    let saveMessage: SaveMessage;
    let errorMessage: string | undefined = undefined;

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
            start_time: getEventFromID(data.currentEventID).start_date + 'T00:00:00', // the start of the event is used here, as it should not be too far away from the actual date.
            duration:   0,
            is_special: false,
        };

        data.currentSlots = [
            ...data.currentSlots,
            newSlotsData,
        ];
    }

    async function updateDisplayed(value: string) {
        errorMessage        = undefined;
        data.currentEventID = getIDFromTitle(value);
        data.currentSlots   = await getTimeSlotsAsync(fetch, data.currentEventID);
    }

    async function save(): Promise<boolean> {
        const toSave = structuredClone(data.currentSlots);
        for (let entry of toSave) {
            console.log(entry.start_time);
            const temp = checkSQLTimeAndDate(convertTimeAndDateToSQL(entry.start_time));
            console.log(temp);
            entry.start_time = temp ? temp : entry.start_time;
        }
        const result = await trySaveDashboardDataAsync(
            { 'time_slots': toSave },
            `/api/dashboard/admin/time-slots/${data.currentEventID}`,
            'POST',
        );

        saveMessage.setSaveMessage(result);

        if (isSuccessType(result)) {
            resetUnsavedChanges();
            return true;
        }
        return false;
    }

    function moveUp(index: number) {
        errorMessage = undefined;
        if (index - 1 == -1) {
            errorMessage = 'Es gibt keinen Slot vor diesem Slot.';
            return;
        }

        if (index < 0 || index >= data.currentSlots.length) {
            console.error(`index out of bounds | Index: ${index}`);
            return;
        }

        [
            data.currentSlots[index - 1],
            data.currentSlots[index],
        ] = [
            data.currentSlots[index],
            data.currentSlots[index - 1],
        ];
    }

    function moveDown(index: number) {
        errorMessage = undefined;
        if (index + 1 == data.currentSlots.length) {
            errorMessage = 'Es gibt kein Slot hinter diesem Slot.';
            return;
        }

        if (index < 0 || index >= data.currentSlots.length) {
            console.error(`index out of bounds | Index: ${index}`);
            return;
        }

        [
            data.currentSlots[index],
            data.currentSlots[index + 1],
        ] = [
            data.currentSlots[index + 1],
            data.currentSlots[index],
        ];
    }

    function deleteEntry(index: number) {
        if (index < 0 || index >= data.currentSlots.length) {
            console.error(`index out of bounds | Index: ${index}`);
            return;
        }

        data.currentSlots.splice(index, 1);
        data.currentSlots = data.currentSlots; // assignment for reactivity
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

    <form on:submit|preventDefault={save}>
        <SaveMessage bind:this={saveMessage} />
        {#if errorMessage !== undefined}
            <Message message={errorMessage} />
        {/if}
        <div class="dashboard-admin-time-slots-grid">
            {#each data.currentSlots as entry, index}
                <Input
                      id="dashboard-admin-time-slot-start-date-{index}"
                      labelText="Start:"
                      type="datetime-local"
                      ariaLabel="Gib den Start des ausgewählten Slots ein."
                      bind:value={entry.start_time}
                      on:input={setUnsavedChanges}
                />
                <DropDown id="dashboard-admin-time-slot-duration-{index}"
                          labelText="Dauer (Minuten):"
                          data={data.talkDurationChoices}
                          bind:selected={entry.duration} />
                <Tooltip tooltip={entry.is_special ? "Aufzeichnung" : "Live-Talk"}>
                    <Toggle ariaLabel="Klicke, um zwischen Live-Talk und Aufzeichnung zu wechseln"
                            bind:toggle={entry.is_special}
                            on:click={unsavedChanges}
                            iconTrue="Video"
                            iconFalse="Broadcast"
                            on:change={setUnsavedChanges} />
                </Tooltip>
                <Button ariaLabel="Klicke, um den Slot nach oben zu verschieben"
                        buttonSize="small-button"
                        on:click={()=> {setUnsavedChanges(); moveUp(index);}}>
                    <Icon type="ArrowUp" />
                </Button>
                <Button ariaLabel="Klicke, um den Slot nach unten zu verschieben"
                        buttonSize="small-button"
                        on:click={() => {setUnsavedChanges(); moveDown(index);}}>
                    <Icon type="ArrowDown" />
                </Button>
                <Button ariaLabel="Klicke, um den Slot zu löschen"
                        buttonSize="small-button"
                        on:click={() => {setUnsavedChanges(); deleteEntry(index)}}>
                    Löschen
                </Button>
            {/each}
        </div>
        <div class="dashboard-admin-time-slots-button-wrapper">
            <Button ariaLabel="Klicke, um einen neuen Time-Slot hinzuzufügen"
                    on:click={() => {setUnsavedChanges(); addSlot(); }}>Hinzufügen
            </Button>
            <Button ariaLabel="Klicke, um Änderungen zu speichern"
                    type="submit">Speichern
            </Button>
        </div>
    </form>

</SectionDashboard>

<style>
    .dashboard-admin-time-slots-grid {
        display:               grid;
        grid-template-columns: 1fr 1fr 7rem 7rem 7rem 11rem;
        gap:                   var(--full-gap);
        margin:                var(--2x-margin) 0 var(--4x-margin);

    }

    .dashboard-admin-time-slots-button-wrapper {
        display:         flex;
        flex-direction:  row;
        justify-content: center;
        gap:             var(--full-gap);
        margin:          0 auto;
    }
</style>
