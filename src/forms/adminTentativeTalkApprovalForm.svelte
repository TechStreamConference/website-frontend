<script lang="ts">
    import type {
        DashboardAllTimeSlots, DashboardTentativeOrAcceptedTalk, DashboardTimeSlot,
    } from 'types/dashboardProvideTypes';

    import { formatDate } from 'helper/dates.js';

    import TextLine from 'elements/text/textLine.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import ScheduleTag from 'elements/schedule/scheduleTag.svelte';
    import Button from 'elements/input/button.svelte';
    import DropDown from 'elements/input/dropDown.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';
    import GeneralPopup from 'elements/popups/generalPopup.svelte';
    import Message from 'elements/text/message.svelte';

    import { trySaveDataAsync } from 'helper/trySaveData.js';
    import { SaveMessageType } from 'types/saveMessageType';
    import { createEventDispatcher, onMount } from 'svelte';
    import { getElementByID } from 'helper/basic';

    export let talk: DashboardTentativeOrAcceptedTalk;
    export let slots: {
        [key: number]: DashboardAllTimeSlots
    };
    let rejectReason: string = '';
    let selected: string     = '';

    let message: SaveMessage;
    let errorList: string[] = [];

    let rejectPopup: GeneralPopup;
    const dispatch = createEventDispatcher();

    onMount(() => {
        selected = getDropDownEntrySafe(talk.suggested_time_slot);
    });

    function getDropDownEntrySafe(slot: DashboardTimeSlot | null): string {
        if (!slot) {
            return '';
        }
        let entry = `${slot.id} | ${formatDate(slot.start_time, '%DD.%MM.%YYYY %hh:%mm')} | ${slot.duration} Minuten`;
        if (slot.is_occupied) {
            entry+= ' | Vergeben';
        }
        return entry;
    }

    function getIDFromDropDownCurrentEntry(): number {
        return Number(selected.split(' | ')[0]);
    }

    async function reject(): Promise<void> {
        const result = await trySaveDataAsync(
            fetch,
            { reason: rejectReason },
            `/dashboard/admin/talk/${talk.id}/reject`,
            'POST',
        );

        message.setSaveMessage(result.success ? SaveMessageType.Delete : SaveMessageType.DeleteError);
        errorList = result.messages;
        if (result.success) {
            dispatch('reject');
        }
    }

    async function suggest(): Promise<void> {
        const id = getIDFromDropDownCurrentEntry();

        if (isNaN(id) || id === 0) {
            errorList = ['Kein Timeslot ausgewählt'];
            return;
        }

        const result = await trySaveDataAsync(
            fetch,
            { time_slot_id: id },
            `/dashboard/admin/talk/${talk.id}/suggest-time-slot`,
            'PUT',
        );

        message.setSaveMessage(result.success ? SaveMessageType.Save : SaveMessageType.Error);
        errorList = result.messages;
        if (result.success) {
            talk.suggested_time_slot = getElementByID(slots[talk.event_id], id);
            talk.suggested_time_slot.is_occupied = true;
            dispatch('suggest');
        }
    }

</script>

<GeneralPopup bind:this={rejectPopup}
              headline="Ablehnen?"
              text="Wenn du diesen Talk ablehnst, kannst du es nicht mehr rückgängig machen"
              denyButtonText="Abbrechen"
              acceptButtonText="Ablehnen"
              denyCallback={() => {}}
              acceptCallback={reject} />

<form class="dashboard-admin-tentative-talk-approval-form form-border"
      on:submit|preventDefault={suggest}>
    <SaveMessage bind:this={message} />
    <MessageWrapper messages={errorList} />
    <div class="dashboard-admin-tentative-entry-wrapper">
        <TextLine>Name:</TextLine>
        <TextLine>{talk.speaker.name}</TextLine>
        <TextLine>Titel:</TextLine>
        <TextLine>{talk.title}</TextLine>
        <TextLine>Tags:</TextLine>
        <div class="dashboard-entry-array-wrapper">
            {#each talk.tags as tag}
                <ScheduleTag {tag} />
            {/each}
        </div>
        <TextLine>Mögliche Längen (in Minuten):</TextLine>
        <div class="dashboard-entry-array-wrapper">
            {#each talk.possible_durations as duration}
                <TextLine>{duration}</TextLine>
            {/each}
        </div>
        <TextLine>Beschreibung:</TextLine>
        <Paragraph classes="paragraph-pre-wrap">{talk.description}</Paragraph>
        <TextLine>Notizen:</TextLine>
        <Paragraph classes="paragraph-pre-wrap">{talk.notes}</Paragraph>
    </div>
    {#if talk.suggested_time_slot}
        <Message message={`Vorgeschlagen: ${getDropDownEntrySafe(talk.suggested_time_slot)}`}
                 color="success" />
    {:else}
        <Message message="Noch kein Slot vorgeschlagen." />
    {/if}
    <DropDown id="dashboard-admin-tentative-talk-approval-slot-drop-down-{talk.id}"
              labelText="Slot:"
              data={slots[talk.event_id].map(x => getDropDownEntrySafe(x))}
              bind:selected={selected} />
    <TextArea id="dashboard-admin-tentative-approval-rejection-area-{talk.id}"
              ariaLabel="Gibt hier einen Ablehnungsgrund ein"
              labelText="Ablehnungsgrund:"
              placeholderText="Ablehnungsgrund"
              bind:value={rejectReason} />
    <div class="dashboard-tentative-talks-button-wrapper">
        <Button type="submit"
                ariaLabel="Klicke hier, um einen slot vor zu schlagen">Slot vorschlagen
        </Button>
        <Button ariaLabel="Klicke hier, um den Talk abzulehnen."
                on:click={() => rejectPopup.show('')}>Ablehnen
        </Button>
    </div>
</form>

<style>
    .dashboard-admin-tentative-talk-approval-form {
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
    }

    .dashboard-admin-tentative-entry-wrapper {
        display:               grid;
        grid-template-columns: auto auto;
        justify-content:       center;
        column-gap:            var(--2x-gap);
        row-gap:               var(--quad-gap);
    }

    .dashboard-entry-array-wrapper {
        display:        flex;
        flex-direction: row;
        gap:            var(--full-gap);
    }

    .dashboard-tentative-talks-button-wrapper {
        display:         flex;
        flex-direction:  row;
        gap:             var(--full-gap);
        justify-content: center;
    }
</style>
