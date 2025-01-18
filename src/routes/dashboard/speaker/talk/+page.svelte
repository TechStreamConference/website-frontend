<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadSpeakerTalk } from 'types/dashboardLoadTypes';
    import type { SetTalk } from 'types/dashboardSetTypes';

    import { getElementByTitle } from 'helper/basic';
    import { loadTentativeOrAcceptedTalksFromEventIDAsync } from './talkHelper';
    import { setUnsavedChanges } from 'stores/saved';
    import { isSuccessType, SaveMessageType } from 'types/saveMessageType';
    import { scrollToTop } from 'helper/scroll';
    import { trySaveDashboardDataAsync } from 'helper/trySaveDashboardData.js';
    import { formatDate } from 'helper/dates.js';
    import { apiUrl } from 'helper/links';

    import Tabs from 'elements/navigation/tabs.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import Button from 'elements/input/button.svelte';
    import Input from 'elements/input/input.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import Message from 'elements/text/message.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import TagArray from 'elements/input/tagArray.svelte';
    import DurationArray from 'elements/input/durationArray.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import ScheduleTag from 'elements/schedule/scheduleTag.svelte';
    import Tag from 'elements/text/tag.svelte';

    export let data: LoadSpeakerTalk;
    let saveMessage: SaveMessage;
    let rejectText: string = '';

    async function save(index: number): Promise<boolean> {
        scrollToTop();

        const currentTalk = data.pendingTalks[index];

        const toSave: SetTalk = {
            title:              currentTalk.title,
            description:        currentTalk.description,
            notes:              currentTalk.notes,
            possible_durations: currentTalk.possible_durations,
            tag_ids:            currentTalk.tags.map(x => x.id),
        };

        console.log(toSave);

        const result = await trySaveDashboardDataAsync(toSave, `/api/dashboard/speaker/talk/${currentTalk.id}`);

        saveMessage.setSaveMessage(result);
        if (isSuccessType(result)) {
            currentTalk.requested_changes = null;
        }
        return isSuccessType(result);
    }

    async function updateDisplayedEvent(selected: string): Promise<void> {
        const current                = getElementByTitle(data.allEvents, selected);
        data.tentativeOrAcceptedTalk = await loadTentativeOrAcceptedTalksFromEventIDAsync(fetch, current.event_id);
    }

    async function acceptSlot(index: number): Promise<void> {
        const currentTalk = data.tentativeOrAcceptedTalk[index];
        const response    = await fetch(
            apiUrl(`/api/dashboard/speaker/talk/${currentTalk.id}/accept-time-slot`),
            { method: 'PUT' },
        );

        if (response.ok) {
            saveMessage.setSaveMessage(SaveMessageType.Approved);
            setTimeout(() => {
                currentTalk.time_slot_accepted = true;
            }, 500);
            return;
        }
        saveMessage.setSaveMessage(SaveMessageType.Error);
    }

    async function rejectSlot(index: number): Promise<void> {
        const currentTalk = data.tentativeOrAcceptedTalk[index];
        const toSave      = {
            reason: rejectText.trim(),
        };
        const response    = await fetch(apiUrl(`/api/dashboard/speaker/talk/${currentTalk.id}/reject-time-slot`), {
            method: 'PUT',
            body:   JSON.stringify(toSave),
        });

        if (response.ok) {
            saveMessage.setSaveMessage(SaveMessageType.Delete);
            setTimeout(() => {
                currentTalk.suggested_time_slot = null;
            }, 500);
            return;
        }
        saveMessage.setSaveMessage(SaveMessageType.Error);
    }
</script>


<Tabs entries={Menu.speaker}
      entryName={MenuItem.speakerTalk.name}
      classes="navigation-tabs-dashboard-subpage" />

<SectionDashboard classes="standard-dashboard-section">
    <SaveMessage bind:this={saveMessage} />
    <NavigationDropDown id="dashboard-speaker-talk-event-navigation"
                        labelText="Event:"
                        data={ data.allEvents.map(x => x.title) }
                        on:navigated={ (e) => { updateDisplayedEvent(e.detail); }} />

    {#each data.pendingTalks as talk, index}
        <form class="dashboard-speaker-talk-form dashboard-speaker-section"
              on:submit|preventDefault={() => { save(index); }}>
            <SubHeadline classes="sub-headline-center">{talk.title}</SubHeadline>
            <SubHeadline classes="sub-headline-center">Vortrag:</SubHeadline>
            {#if talk.requested_changes}
                <Message classes="message-pre-wrap"
                         message={`Änderungswünsche:\n${talk.requested_changes}`} />
            {/if}
            <Input id="dashboard-speaker-talk-input-title"
                   labelText="Titel:"
                   placeholderText="Titel"
                   ariaLabel="Gib hier den Titel des Talks ein"
                   bind:value={talk.title}
                   on:input={setUnsavedChanges} />
            <TextArea id="dashboard-speaker-talk-input-description"
                      labelText="Beschreibung:"
                      placeholderText="Beschreibung"
                      ariaLabel="Gib hier die Beschreibung des Talks ein"
                      bind:value={talk.description}
                      on:input={setUnsavedChanges}
                      on:submit={() => { save(index); }} />
            <TagArray labelText="Tags:"
                      data={data.tags}
                      bind:selected={talk.tags}
                      on:toggle={setUnsavedChanges} />
            <DurationArray labelText="Vortragslänge in Minuten:"
                           data={data.talkDurations}
                           bind:selected={talk.possible_durations}
                           on:toggle={setUnsavedChanges} />
            <TextArea id="dashboard-speaker-talk-input-notes"
                      labelText="Anmerkungen:"
                      placeholderText="Anmerkungen"
                      ariaLabel="Gib hier Anmerkungen zum Talk ein."
                      bind:value={talk.notes}
                      on:input={setUnsavedChanges}
                      on:submit={() => { save(index); }} />
            <div class="dashboard-speaker-talk-button-wrapper">
                <Button type="submit"
                        ariaLabel="Klicke, um den Talk zu speichern">Speichern
                </Button>
            </div>
        </form>
    {/each}
    {#each data.tentativeOrAcceptedTalk as talk, index}
        <div class="dashboard-speaker-talk-time-slot dashboard-speaker-section">
            <SubHeadline classes="sub-headline-center">{talk.title}</SubHeadline>
            <SubHeadline classes="sub-headline-center">Vortrag:</SubHeadline>
            <div class="dashboard-speaker-talk-time-slot-wrapper">
                <TextLine>Titel:</TextLine>
                <TextLine>{talk.title}</TextLine>
                <TextLine>Beschreibung:</TextLine>
                <Paragraph classes="paragraph-pre-wrap">{talk.description}</Paragraph>
                <TextLine>Tags:</TextLine>
                <div class="dashboard-speaker-talk-entry-wrapper">
                    {#each talk.tags as tag}
                        <ScheduleTag {tag} />
                    {/each}
                </div>
                <TextLine>Mögliche Vortragszeiten:</TextLine>
                <div class="dashboard-speaker-talk-entry-wrapper">
                    {#each talk.possible_durations as duration}
                        <Tag text={duration.toString() + ' min'}
                             --tag-text-color={"var(--white-color)"}
                             --tag-background-color={"var(--primary-color-dark)"}
                        />
                    {/each}
                </div>
            </div>
            {#if talk.suggested_time_slot}
                <SubHeadline classes="sub-headline-center">Zeit:</SubHeadline>
                <div class="dashboard-speaker-talk-time-slot-wrapper">
                    <TextLine>Slot:</TextLine>
                    <TextLine>{formatDate(talk.suggested_time_slot.start_time,
                                          '%d, %DD.%MM.%YYYY - %hh:%mm Uhr'
                    )}</TextLine>
                    <TextLine>Dauer:</TextLine>
                    <TextLine>{talk.suggested_time_slot.duration} Minuten</TextLine>
                    <TextLine>Art:</TextLine>
                    <TextLine>{talk.suggested_time_slot.is_special
                               ? "YouTube-Premiere"
                               : "Live-Talk"}</TextLine>
                </div>
                {#if !talk.time_slot_accepted}
                    <TextArea id="dashboard-speaker-talk-reject-text-area"
                              labelText="Ablehnungsgrund (optional):"
                              placeholderText="Ablehnungsgrund"
                              ariaLabel="Gib hier einen Grund an warum du den vorgeschlagenen Time-Slot ablehnen musst."
                              rows={5}
                              bind:value={rejectText}
                              on:input={setUnsavedChanges} />
                    <div class="dashboard-speaker-talk-button-wrapper">
                        <Button ariaLabel="Klicke, um den Time-Slot abzulehnen"
                                on:click={() => { rejectSlot(index);}}>Ablehnen
                        </Button>
                        <Button ariaLabel="Klicke, um den Time-Slot anzunehmen"
                                on:click={() => { acceptSlot(index); }}>Annehmen
                        </Button>
                    </div>
                {/if}
            {/if}
        </div>
    {/each}

</SectionDashboard>

<style>
    .dashboard-speaker-section {
        margin-top:    var(--4x-margin);
        border:        1px solid var(--primary-color-dark);
        border-radius: var(--border-radius);
        padding:       var(--full-padding);
        gap:           var(--full-gap);
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
        margin:                0 auto;
    }

    .dashboard-speaker-talk-button-wrapper {
        display:        flex;
        flex-direction: row;
        margin:         var(--2x-margin) auto 0;
        gap:            var(--full-gap);
    }

    .dashboard-speaker-talk-entry-wrapper {
        display:        flex;
        flex-direction: row;
        gap:            var(--full-gap);
        flex-wrap:      wrap;
    }
</style>
