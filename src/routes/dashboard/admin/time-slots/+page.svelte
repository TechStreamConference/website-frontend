<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadAdminTimeSlots } from 'types/dashboardLoadTypes';
    import type { DashboardTimeSlot } from 'types/dashboardProvideTypes';

    import { setUnsavedChanges, unsavedChanges } from 'stores/saved';
    import { getTimeSlotsAsync } from './timeSlotHelper';
    import { trySaveDataAsync } from 'helper/trySaveData';
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
    import Tooltip from 'elements/text/tooltip.svelte';
    import DropDown from 'elements/input/dropDown.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';
    import { getElementByID, getIDFromTitle } from 'helper/basic';
    import { SaveMessageType } from 'types/saveMessageType';

    export let data: LoadAdminTimeSlots;

    let saveMessage: SaveMessage;
    let errorList: string[] = [];

    function addSlot() {
        const newSlotsData: DashboardTimeSlot = {
            event_id:   data.currentEventID,
            id:         0,
            start_time: getElementByID(data.allEvents, data.currentEventID).start_date + 'T00:00:00', // the start of the event is used here, as it should not be too far away from the actual date.
            duration:   0,
            is_special: false,
        };

        data.currentSlots = [
            ...data.currentSlots,
            newSlotsData,
        ];
    }

    async function updateDisplayed(value: string) {
        errorList           = [];
        data.currentEventID = getIDFromTitle(data.allEvents, value);
        data.currentSlots   = await getTimeSlotsAsync(fetch, data.currentEventID);
    }

    async function save(): Promise<boolean> {
        const toSave = structuredClone(data.currentSlots);
        for (let entry of toSave) {
            const temp = checkSQLTimeAndDate(convertTimeAndDateToSQL(entry.start_time));
            entry.start_time = temp ? temp : entry.start_time;
        }
        const result = await trySaveDataAsync(
            fetch,
            { 'time_slots': toSave },
            `/api/dashboard/admin/time-slots/${data.currentEventID}`,
            'POST',
        );

        saveMessage.setSaveMessage(result.success ? SaveMessageType.Save : SaveMessageType.Error);
        errorList = result.messages;
        return result.success;
    }

    function moveUp(index: number) {
        errorList = [];
        if (index - 1 == -1) {
            errorList = ['Es gibt keinen Slot vor diesem Slot.'];
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
        errorList = [];
        if (index + 1 == data.currentSlots.length) {
            errorList = ['Es gibt kein Slot hinter diesem Slot.'];
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
<Tabs classes="navigation-tabs-dashboard-subpage"
      entries={Menu.admin}
      entryName={MenuItem.adminEventSlots.name} />
<SectionDashboard classes="standard-dashboard-section">
    <NavigationDropDown id="dashboard-admin-time-slots-event-drop-down"
                        labelText="Aktuelles Event:"
                        data={data.allEvents.map(x=>x.title)}
                        on:navigated={(e) => {updateDisplayed(e.detail);}} />

    <form on:submit|preventDefault={save}>
        <SaveMessage bind:this={saveMessage} />
        <MessageWrapper messages={errorList} />
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
                <Tooltip classes="dashboard-admin-time-slots-tooltip"
                         tooltip={entry.is_special ? "Aufzeichnung" : "Live-Talk"}>
                    <Toggle ariaLabel="Klicke, um zwischen Live-Talk und Aufzeichnung zu wechseln"
                            bind:toggle={entry.is_special}
                            on:click={unsavedChanges}
                            on:change={setUnsavedChanges}>
                        <Icon slot="slotTrue"
                              type="Video"
                              color="green" />
                        <Icon slot="slotFalse"
                              type="Broadcast"
                              color="red" />
                    </Toggle>
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

    :global(.dashboard-admin-time-slots-tooltip) {
        cursor: default !important;
    }
</style>
