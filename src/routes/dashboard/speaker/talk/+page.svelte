<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadSpeakerTalk } from 'types/dashboardLoadTypes';
    import type { SetTalk } from 'types/dashboardSetTypes';

    import { Clone } from 'helper/clone';
    import { getElementByTitle } from 'helper/basic';
    import { loadTalkFromEventIDAsync } from './talkHelper';
    import { setUnsavedChanges } from 'stores/saved';
    import { isSuccessType, SaveMessageType } from 'types/saveMessageType';
    import { scrollToTop } from 'helper/scroll';
    import { trySaveDashboardDataAsync } from 'helper/trySaveDashboardData.js';
    import { formatDate } from 'helper/dates.js';
    import { fade } from 'svelte/transition';
    import { apiUrl } from 'helper/links';

    import Tabs from 'elements/navigation/tabs.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import Button from 'elements/input/button.svelte';
    import Input from 'elements/input/input.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import Message from 'elements/text/message.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import TagArray from 'elements/input/tagArray.svelte';
    import DurationArray from 'elements/input/durationArray.svelte';
    import HeadlineH2 from 'elements/text/headlineH2.svelte';

    export let data: LoadSpeakerTalk;
    let saveMessage: SaveMessage;

    async function save(): Promise<boolean> {
        console.log(data.currentTalk?.value);
        scrollToTop();
        if (!data.currentTalk) {
            saveMessage.setSaveMessage(SaveMessageType.Error);
            return false;
        }

        const toSave: SetTalk = {
            title:              data.currentTalk.value.title,
            description:        data.currentTalk.value.description,
            notes:              data.currentTalk.value.notes,
            possible_durations: data.currentTalk.value.possible_durations,
            tag_ids:            data.currentTalk.value.tags.map(x => x.id),
        };

        const result = await trySaveDashboardDataAsync(
            toSave,
            `/api/dashboard/speaker/talk/${data.currentTalk.value.id}`,
        );

        saveMessage.setSaveMessage(result);
        return isSuccessType(result);
    }

    async function updateDisplayedEvent(selected: string): Promise<void> {
        const current    = getElementByTitle(data.allEvent, selected);
        data.allTalks    = await loadTalkFromEventIDAsync(fetch, current.event_id);
        data.currentTalk = data.allTalks.length > 0 ? new Clone(data.allTalks[0]) : undefined;
    }

    function updateDisplayedTalk(selected: string): void {
        data.currentTalk = new Clone(getElementByTitle(data.allTalks, selected));
    }

    async function acceptSlot(): Promise<void> {
        if (data.currentTalk === undefined) {
            console.error('undefined current talk while accept slot');
            return;
        }
        const response = await fetch(
            apiUrl(`/api/dashboard/speaker/talk/${data.currentTalk.value.id}/accept-time-slot`),
            { method: 'PUT' },
        );

        if (response.ok) {
            saveMessage.setSaveMessage(SaveMessageType.Approved);
            setTimeout(() => {
                if (data.currentTalk === undefined) {
                    return;
                }
                data.currentTalk.value.time_slot_accepted = true;
            }, 500);
            return;
        }
        saveMessage.setSaveMessage(SaveMessageType.Error);
    }

    async function rejectSlot(): Promise<void> {
        if (data.currentTalk === undefined) {
            console.error('undefined current talk while reject slot');
            return;
        }
        const response = await fetch(
            apiUrl(`/api/dashboard/speaker/talk/${data.currentTalk.value.id}/reject-time-slot`),
            { method: 'PUT' },
        );

        if (response.ok) {
            saveMessage.setSaveMessage(SaveMessageType.Delete);
            setTimeout(() => {
                if (data.currentTalk === undefined) {
                    return;
                }
                data.currentTalk.value.suggested_time_slot = null;
            }, 500);
            return;
        }
        saveMessage.setSaveMessage(SaveMessageType.Delete);
    }
</script>


<Tabs entries={Menu.speaker}
      entryName={MenuItem.speakerTalk.name}
      classes="navigation-tabs-dashboard-subpage" />
<UnsavedChangesCallbackWrapper callback={save} />

<SectionDashboard classes="standard-dashboard-section">
    <SaveMessage bind:this={saveMessage} />
    <NavigationDropDown id="dashboard-speaker-talk-event-navigation"
                        labelText="Event:"
                        data={ data.allEvent.map(x => x.title) }
                        on:navigated={ (e) => { updateDisplayedEvent(e.detail); }} />
    <NavigationDropDown id="dashboard-speaker-talk-talk-navigation"
                        labelText="Talk:"
                        data={ data.allTalks.map(x => x.title) }
                        on:navigated={ (e) => { updateDisplayedTalk(e.detail); }} />

    {#if data.currentTalk === undefined}
        <TextLine>Kein aktueller Talk ausgewählt.</TextLine>
    {:else }
        {#if !data.currentTalk.value.time_slot_accepted && data.currentTalk.value.suggested_time_slot}

            <div class="dashboard-speaker-talk-time-slot dashboard-speaker-section"
                 transition:fade={{ duration: 300 }}>
                <HeadlineH2>Slot:</HeadlineH2>
                <div class="dashboard-speaker-talk-time-slot-wrapper">
                    <TextLine>Slot:</TextLine>
                    <TextLine>{formatDate(data.currentTalk.value.suggested_time_slot.start_time,
                                          '%d, %DD.%MM.%YYYY - %hh:%mm Uhr'
                    )}</TextLine>
                    <TextLine>Dauer:</TextLine>
                    <TextLine>{data.currentTalk.value.suggested_time_slot.duration} Minuten</TextLine>
                    <TextLine>Art:</TextLine>
                    <TextLine>{data.currentTalk.value.suggested_time_slot.is_special
                               ? "YouTube-Premiere"
                               : "Live-Talk"}</TextLine>
                </div>
                <div class="dashboard-speaker-talk-button-wrapper">
                    <Button ariaLabel="Klicke, um den Time-Slot abzulehnen"
                            on:click={rejectSlot}>Ablehnen
                    </Button>
                    <Button ariaLabel="Klicke, um den Time-Slot anzunehmen"
                            on:click={acceptSlot}>Annehmen
                    </Button>
                </div>
            </div>
        {/if}
        <form class="dashboard-speaker-talk-form dashboard-speaker-section"
              on:submit|preventDefault={save}>
            <HeadlineH2>Talk:</HeadlineH2>
            {#if data.currentTalk.value.requested_changes}
                <Message classes="message-pre-wrap"
                         message={`Änderungswünsche\n${data.currentTalk.value.requested_changes}`} />
            {/if}
            <Input id="dashboard-speaker-talk-input-title"
                   labelText="Titel:"
                   placeholderText="Titel"
                   ariaLabel="Gib hier den Titel des Talks ein"
                   bind:value={data.currentTalk.value.title}
                   on:input={setUnsavedChanges} />
            <TextArea id="dashboard-speaker-talk-input-description"
                      labelText="Beschreibung:"
                      placeholderText="Beschreibung"
                      ariaLabel="Gib hier die Beschreibung des Talks ein"
                      bind:value={data.currentTalk.value.description}
                      on:input={setUnsavedChanges}
                      on:submit={save} />
            <TagArray labelText="Tags:"
                      data={data.tags}
                      bind:selected={data.currentTalk.value.tags}
                      on:toggle={setUnsavedChanges} />
            <DurationArray labelText="Vortragslänge"
                           data={data.talkDurations}
                           bind:selected={data.currentTalk.value.possible_durations}
                           on:toggle={setUnsavedChanges} />
            <TextArea id="dashboard-speaker-talk-input-notes"
                      labelText="Anmerkungen:"
                      placeholderText="Anmerkungen"
                      ariaLabel="Gib hier Anmerkungen zum Talk ein."
                      bind:value={data.currentTalk.value.notes}
                      on:input={setUnsavedChanges}
                      on:submit={save} />
            <div class="dashboard-speaker-talk-button-wrapper">
                <Button type="submit"
                        ariaLabel="Klicke, um den Talk zu speichern">Speichern
                </Button>
            </div>
        </form>
    {/if}
</SectionDashboard>

<style>
    .dashboard-speaker-section {
        margin-top:    var(--4x-margin);
        border:        1px solid var(--primary-color-dark);
        border-radius: var(--border-radius);
        padding:       var(--full-padding);
    }

    .dashboard-speaker-talk-form {
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
    }

    .dashboard-speaker-talk-time-slot {
        display:        flex;
        flex-direction: column;

    }

    .dashboard-speaker-talk-time-slot-wrapper {
        display:               grid;
        grid-template-columns: auto auto;
        width:                 fit-content;
        gap:                   var(--full-gap);
        margin:                var(--2x-margin) auto;
    }

    .dashboard-speaker-talk-button-wrapper {
        display:        flex;
        flex-direction: row;
        margin:         var(--2x-margin) auto 0;
        gap:            var(--full-gap);
    }
</style>
