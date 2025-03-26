<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/dashboardItems';

    import type { LoadSpeakerTalk } from 'types/dashboardLoadTypes';

    import { getElementByTitle } from 'helper/basic';
    import { loadTentativeOrAcceptedTalksFromEventIDAsync } from './talkHelper';
    import { setUnsavedChanges } from 'stores/saved';
    import { SaveMessageType } from 'types/saveMessageType';
    import { trySaveDataAsync } from 'helper/trySaveData.js';
    import { formatDate } from 'helper/dates.js';
    import { apiUrl } from 'helper/links';
    import { fade } from 'svelte/transition';

    import Tabs from 'elements/navigation/tabs.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import Button from 'elements/input/button.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import ScheduleTag from 'elements/schedule/scheduleTag.svelte';
    import Tag from 'elements/text/tag.svelte';
    import GeneralPopup from 'elements/popups/generalPopup.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';
    import SpeakerTalkForm from 'forms/speakerTalkForm.svelte';
    import Explanation from 'elements/text/explanation.svelte';

    export let data: LoadSpeakerTalk;
    let saveMessage: SaveMessage;
    let errorList: string[];
    let rejectText: string = '';
    let acceptPopup: GeneralPopup;
    let rejectPopup: GeneralPopup;

    async function updateDisplayedEvent(selected: string): Promise<void> {
        const current                 = getElementByTitle(data.allEvents, selected);
        data.tentativeOrAcceptedTalks = await loadTentativeOrAcceptedTalksFromEventIDAsync(fetch, current.event_id);
    }

    async function acceptSlot(index: number): Promise<void> {
        const currentTalk = data.tentativeOrAcceptedTalks[index];
        const response    = await trySaveDataAsync(
            fetch,
            [],
            `/dashboard/speaker/talk/${currentTalk.id}/accept-time-slot`,
            'PUT',
        );

        saveMessage.setSaveMessage(response.success ? SaveMessageType.Approved : SaveMessageType.Error);
        errorList = response.messages;
        if (response.success) {
            data.tentativeOrAcceptedTalks[index].time_slot_accepted = true;
        }
    }

    async function rejectSlot(index: number): Promise<void> {
        const currentTalk = data.tentativeOrAcceptedTalks[index];
        const toSave      = {
            reason: rejectText.trim(),
        };
        const response    = await fetch(apiUrl(`/dashboard/speaker/talk/${currentTalk.id}/reject-time-slot`), {
            method: 'PUT',
            body:   JSON.stringify(toSave),
        });

        if (response.ok) {
            saveMessage.setSaveMessage(SaveMessageType.Delete);
            data.tentativeOrAcceptedTalks[index].suggested_time_slot = null;
            return;
        }
        saveMessage.setSaveMessage(SaveMessageType.Error);
    }
</script>


<Tabs entries={Menu.speaker}
      entryName={MenuItem.speakerTalk.name}
      classes="navigation-tabs-dashboard-subpage navigation-tabs-wide-dashboard-override" />

<GeneralPopup bind:this={acceptPopup}
              headline="Vortragszeit akzeptieren?"
              text="Hiermit akzeptierst du die vorgeschlagene Vortragszeit."
              acceptButtonText="Akzeptieren"
              denyButtonText="Verwerfen"
              acceptCallback={(index) => {
                  if (typeof index !== 'number') {
                      console.error(`provided index ${index} is not a number`);
                      return;
                  }
                  acceptSlot(index);}}
              denyCallback={() => {}} />
<GeneralPopup bind:this={rejectPopup}
              headline="Vortragszeit ablehnen?"
              text="Hiermit lehnst du die vorgeschlagene Vortragszeit ab. Gib uns gerne einen Grund an."
              acceptButtonText="Ablehnen"
              denyButtonText="Verwerfen"
              acceptCallback={(index) => {
                  if (typeof index !== 'number') {
                      console.error(`provided index ${index} is not a number`);
                      return;
                  }
                  rejectSlot(index);}}
              denyCallback={() => {}} />

<SectionDashboard classes="standard-dashboard-section wide-dashboard-section-override">
    <Explanation>
        Du siehst hier die Vorträge, die du eingereicht hast. Wähle zunächst über das Dropdown-Menü das Event aus. Wenn ein Talk von uns akzeptiert wurde, kannst du daran keine Änderungen mehr vornehmen.
    </Explanation>
    <SaveMessage bind:this={saveMessage} />
    <MessageWrapper messages={errorList} />
    <NavigationDropDown id="dashboard-speaker-talk-event-navigation"
                        labelText="Event:"
                        data={ data.allEvents.map(x => x.title) }
                        on:navigated={ (e) => { updateDisplayedEvent(e.detail); }} />

    {#each data.pendingTalks as talk}
        <SpeakerTalkForm classes="dashboard-speaker-talk-form dashboard-speaker-section"
                         data={talk}
                         tags={data.tags}
                         talkDurations={data.talkDurations} />
    {/each}
    {#each data.tentativeOrAcceptedTalks as talk, index}
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
                <div transition:fade={{ duration: 300 }}>
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
                        <div class="dashboard-speaker-talk-time-slot-action-wrapper"
                             transition:fade={{ duration: 300 }}>
                    <TextArea id="dashboard-speaker-talk-reject-text-area"
                              labelText="Ablehnungsgrund (optional):"
                              placeholderText="Ablehnungsgrund"
                              ariaLabel="Gib hier einen Grund an warum du den vorgeschlagenen Time-Slot ablehnen musst."
                              rows={5}
                              bind:value={rejectText}
                              on:input={setUnsavedChanges} />
                            <div class="dashboard-speaker-talk-button-wrapper">
                                <Button ariaLabel="Klicke, um den Time-Slot abzulehnen"
                                        on:click={() => { rejectPopup.show(index);}}>Ablehnen
                                </Button>
                                <Button ariaLabel="Klicke, um den Time-Slot anzunehmen"
                                        on:click={() => { acceptPopup.show(index); }}>Annehmen
                                </Button>
                            </div>
                        </div>
                    {/if}
                </div>
            {:else}
                <TextLine classes="text-line-center">Diesem Vortrag wurde noch keine Vortragszeit zugewiesen.</TextLine>
            {/if}
        </div>
    {/each}

</SectionDashboard>

<style>
    :global(.dashboard-speaker-section) {
        margin-top:    var(--4x-margin);
        border:        1px solid var(--primary-color-dark);
        border-radius: var(--border-radius);
        padding:       var(--full-padding);
        gap:           var(--2x-gap);
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

    .dashboard-speaker-talk-time-slot-action-wrapper {
        display:         flex;
        flex-direction:  column;
        justify-content: center;
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
