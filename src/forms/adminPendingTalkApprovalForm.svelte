<script lang="ts">
    import type { DashboardPendingTalk } from 'types/dashboardProvideTypes';

    import { trySaveDataAsync } from 'helper/trySaveData.js';
    import { SaveMessageType } from 'types/saveMessageType';
    import { createEventDispatcher } from 'svelte';

    import SaveMessage from 'elements/text/saveMessage.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import ScheduleTag from 'elements/schedule/scheduleTag.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import Button from 'elements/input/button.svelte';
    import GeneralPopup from 'elements/popups/generalPopup.svelte';

    export let talk: DashboardPendingTalk;

    let message: SaveMessage;
    let errorList: string[] = [];

    let approvePopup: GeneralPopup;
    let rejectPopup: GeneralPopup;

    const dispatch = createEventDispatcher();

    function validateApprove(): boolean {
        errorList = [];

        if (talk.requested_changes.trim().length !== 0) {
            errorList.push(
                'Ein Talk kann nicht freigegeben oder abgelehnt werden, wenn Änderungswünsche eingetragen sind.');
        }

        return errorList.length === 0;
    }

    async function approve(): Promise<void> {
        if (!validateApprove()) {
            return;
        }

        const result = await trySaveDataAsync(fetch, [], `/dashboard/admin/talk/${talk.id}/approve`, 'PUT');

        message.setSaveMessage(result.success ? SaveMessageType.Approved : SaveMessageType.Error);
        errorList = result.messages;
        if (result.success) {
            dispatch('approve');
        }
    }

    function validateChangesReject(): boolean {
        errorList = [];

        if (talk.requested_changes.trim().length === 0) {
            errorList.push('Es sind keine Änderungswünsche eingetragen.');
        }

        return errorList.length === 0;
    }

    async function reject(): Promise<void> {
        if (!validateChangesReject()) {
            return;
        }

        const result = await trySaveDataAsync(
            fetch,
            { reason: talk.requested_changes },
            `/dashboard/admin/talk/${talk.id}/reject`,
            'POST',
        );

        message.setSaveMessage(result.success ? SaveMessageType.Delete : SaveMessageType.DeleteError);
        errorList = result.messages;
        if (result.success) {
            dispatch('reject');
        }
    }

    async function changes(): Promise<void> {
        if (!validateChangesReject()) {
            return;
        }

        const result = await trySaveDataAsync(
            fetch,
            { requested_changes: talk.requested_changes },
            `/dashboard/admin/talk/${talk.id}/request-changes`,
            'POST',
        );

        message.setSaveMessage(result.success ? SaveMessageType.Save : SaveMessageType.Error);
        errorList = result.messages;
        if (result.success) {
            dispatch('changes');
        }
    }
</script>

<GeneralPopup bind:this={approvePopup}
              headline="Freigeben?"
              text="Wenn du diesen Talk freigibst, kannst du es nicht mehr rückgängig machen"
              denyButtonText="Abbrechen"
              acceptButtonText="Freigeben"
              denyCallback={() => {}}
              acceptCallback={approve} />
<GeneralPopup bind:this={rejectPopup}
              headline="Ablehnen?"
              text="Wenn du diesen Talk ablehnst, kannst du es nicht mehr rückgängig machen"
              denyButtonText="Abbrechen"
              acceptButtonText="Ablehnen"
              denyCallback={() => {}}
              acceptCallback={reject} />

<form class="dashboard-admin-pending-talk-approval-form form-border"
      on:submit|preventDefault={() => approvePopup.show('') }>
    <SaveMessage bind:this={message} />
    <MessageWrapper messages={errorList} />

    <div class="dashboard-admin-pending-talk-approval-entry">
        <TextLine>Speaker:</TextLine>
        <TextLine>{talk.speaker.name}</TextLine>
        <TextLine>Titel:</TextLine>
        <TextLine>{talk.title}</TextLine>
        <TextLine>Tags:</TextLine>
        <div class="dashboard-admin-pending-talk-list-wrapper">
            {#each talk.tags as tag}
                <ScheduleTag {tag} />
            {/each}
        </div>
        <TextLine>Mögliche Längen (in Minuten):</TextLine>
        <div class="dashboard-admin-pending-talk-list-wrapper">
            {#each talk.possible_durations as duration}
                <TextLine>{duration}</TextLine>
            {/each}
        </div>
        <TextLine>Beschreibung:</TextLine>
        <Paragraph classes="paragraph-pre-wrap">{talk.description}</Paragraph>
        <TextLine>Notizen:</TextLine>
        <Paragraph classes="paragraph-pre-wrap">{talk.notes}</Paragraph>
    </div>
    <TextArea id="dashboard-admin-pending-talk-approval-changes-{talk.id}"
              ariaLabel="Gebe hier Änderungswünsche zu dem Talks ein"
              labelText="Änderungswünsche / Ablehnungsgrund:"
              placeholderText="Änderungswünsche / Ablehnungsgrund"
              bind:value={talk.requested_changes}
              on:submit={changes} />
    <div class="pending-talk-button-array">
        <Button type="submit"
                ariaLabel="Klicke hier, um den Talk frei zu geben">Freigeben
        </Button>
        <Button ariaLabel="Klicke hier, um den Talk abzulehnen"
                on:click={() => rejectPopup.show('')}>Ablehnen
        </Button>
        <Button ariaLabel="Klicke hier, um Änderungswünsche zu speichern."
                on:click={changes}>Änderungswünsche
        </Button>
    </div>
</form>

<style>
    .dashboard-admin-pending-talk-approval-form {
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
    }

    .dashboard-admin-pending-talk-approval-entry {
        display:               grid;
        grid-template-columns: auto auto;
        justify-content:       center;
        row-gap:               var(--quad-gap);
        column-gap:            var(--2x-gap);
    }

    .dashboard-admin-pending-talk-list-wrapper {
        display:        flex;
        flex-direction: row;
        flex-wrap:      wrap;
        gap:            var(--full-gap);
    }

    .pending-talk-button-array {
        display:         flex;
        flex-direction:  row;
        gap:             var(--full-gap);
        justify-content: center;
    }
</style>
