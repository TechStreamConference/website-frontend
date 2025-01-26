<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadAdminEvents, LoadDashboard } from 'types/dashboardLoadTypes';
    import type { DashboardAllEventSpeaker, DashboardEvent } from 'types/dashboardProvideTypes';
    import type { SetAdminEvent, SetAllAdminEventSpeaker } from 'types/dashboardSetTypes';
    import { type SaveResult, trySaveDataAsyncOutReset } from 'helper/trySaveData';
    import { SaveMessageType } from 'types/saveMessageType';

    import { onMount } from 'svelte';
    import { Clone } from 'helper/clone';
    import { convertSaveEventData, convertSaveSpeakerData, loadSpeaker, validateData } from './eventsHelper';
    import { resetUnsavedChanges, setUnsavedChanges } from 'stores/saved';
    import { convertTimeAndDateToHTML, formatDate } from 'helper/dates';
    import { trySaveDataAsync } from 'helper/trySaveData';
    import { scrollToTop } from 'helper/scroll';
    import { getElementByTitle } from 'helper/basic';

    import TextLine from 'elements/text/textLine.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import Input from 'elements/input/input.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import Button from 'elements/input/button.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
    import Tabs from 'elements/navigation/tabs.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';

    export let data: LoadDashboard & LoadAdminEvents;

    let copiedData = new Clone<LoadDashboard & LoadAdminEvents>(data);

    let message: SaveMessage;
    let navigationDropDown: NavigationDropDown;

    let currentEvent: DashboardEvent;
    let errorQueue: string[] = [];


    onMount(() => {
        const selected = navigationDropDown.getSelected();
        if (typeof selected !== 'string') {
            console.error('selected has wrong type');
            return;
        }
        updateDisplayed(selected);
    });

    function updateDisplayed(title: string): void {
        currentEvent                       = getElementByTitle(copiedData.value.allEvents, title);
        currentEvent.publish_date          = convertTimeAndDateToHTML(currentEvent.publish_date);
        currentEvent.schedule_visible_from = convertTimeAndDateToHTML(currentEvent.schedule_visible_from);
        currentEvent.call_for_papers_start = convertTimeAndDateToHTML(currentEvent.call_for_papers_start);
        currentEvent.call_for_papers_end   = convertTimeAndDateToHTML(currentEvent.call_for_papers_end);

        loadSpeaker(fetch, currentEvent.id).then((newData: DashboardAllEventSpeaker) => {
            copiedData.value.allSpeaker = newData;
        }, () => {
            /**
             * This is a tradeoff here.
             * By using then and providing this lambda I do not need to make this function async.
             * To have this function not async makes this component way easier.
             * So I catch the throw(406) and just display an error in the console.
             */
            copiedData.value.allSpeaker = [];
            console.error(`not able to load speaker data from event ${currentEvent.id}`);
        });
    }

    function newEvent(): void {
        const setSelected               = (title: string) => {
            setTimeout(() => {
                navigationDropDown.trySetSelected(title);
            }, 5);
        };
        const containsNewEvent: boolean = (() => {
            for (let event of copiedData.value.allEvents) {
                if (event.id === 0) {
                    setSelected(event.title);
                    updateDisplayed(event.title);
                    return true;
                }
            }
            return false;
        })();
        if (!containsNewEvent) {
            const event: DashboardEvent = {
                id:                    0,
                title:                 '',
                subtitle:              '',
                start_date:            formatDate(String(new Date()), '%YYYY-%MM-%DD'),
                end_date:              formatDate(String(new Date()), '%YYYY-%MM-%DD'),
                discord_url:           '',
                twitch_url:            '',
                presskit_url:          '',
                trailer_youtube_id:    '',
                description_headline:  '',
                description:           '',
                schedule_visible_from: formatDate(String(new Date()), '%YYYY-%MM-%DDT%hh:00:00'),
                publish_date:          formatDate(String(new Date()), '%YYYY-%MM-%DDT%hh:00:00'),
                call_for_papers_start: formatDate(String(new Date()), '%YYYY-%MM-%DDT%hh:00:00'),
                call_for_papers_end:   formatDate(String(new Date()), '%YYYY-%MM-%DDT%hh:00:00'),
            };
            copiedData.value.allEvents.push(event);
            setSelected(event.title);
            updateDisplayed(event.title);
        }
    }

    async function trySaveAsync(): Promise<boolean> {
        const toSaveEvent: SetAdminEvent             = convertSaveEventData(structuredClone(currentEvent));
        const toSaveSpeaker: SetAllAdminEventSpeaker = convertSaveSpeakerData(structuredClone(copiedData.value.allSpeaker));

        scrollToTop(); // scroll here already so that all error messages can be seen.

        errorQueue = validateData(toSaveEvent, toSaveSpeaker, copiedData.value.allEvents);
        if (errorQueue.length > 0) {
            return false;
        }

        const result: SaveResult = await (async () => {
            if (toSaveEvent.id === 0) {
                const result = await trySaveDataAsync(fetch, toSaveEvent, '/api/dashboard/admin/event/new', 'POST');
                if (result.success) {
                    location.reload();
                }
                return result;
            }

            // manually reset unsaved changes to ensure that they are only reset if both Api calls were successful
            const resultEventPromise   = trySaveDataAsyncOutReset(
                fetch,
                toSaveEvent,
                `/api/dashboard/admin/event/${toSaveEvent.id}`,
                'PUT',
            );
            const resultSpeakerPromise = trySaveDataAsyncOutReset(
                fetch,
                toSaveSpeaker,
                `/api/dashboard/admin/event/${toSaveEvent.id}/speaker`,
                'PUT',
            );

            const resultEvent   = await resultEventPromise;
            const resultSpeaker = await resultSpeakerPromise;
            const toReturn      = {
                success:  resultEvent.success && resultSpeaker.success,
                messages: [
                    ...resultEvent.messages,
                    ...resultSpeaker.messages,
                ],
            };

            if (toReturn.success) {
                resetUnsavedChanges();
            }

            return toReturn;

        })();

        message.setSaveMessage(result.success ? SaveMessageType.Save : SaveMessageType.Error);
        errorQueue = result.messages;
        return result.success;
    }
</script>

<Tabs
      entries={Menu.admin}
      entryName={MenuItem.adminEvents.name}
      classes="navigation-tabs-dashboard-subpage"
/>
<UnsavedChangesCallbackWrapper callback={trySaveAsync} />
<SectionDashboard classes="dashboard-admin-event-section">
    <Button
          classes="dashboard-admin-event-new-event-button"
          ariaLabel="Klicke hier, um ein neues Event anzulegen."
          on:click={newEvent}
    >
        Neues Event
    </Button>
    <div class="dashboard-admin-event-message-wrapper">
        <SaveMessage bind:this={message} />
        <MessageWrapper messages={errorQueue} />
    </div>
    {#if copiedData.value.allEvents}
        <NavigationDropDown
              id={'dashboard-admin-event-drop-down'}
              data={copiedData.value.allEvents.map(x => x.title)}
              labelText="Aktuelles Event:"
              on:navigated={ (e) => { updateDisplayed(e.detail); }}
              bind:this={navigationDropDown}
        />
        {#if currentEvent}
            <SubHeadline classes="dashboard-admin-event-event-subheadline"
            >{currentEvent.title}</SubHeadline
            >
            <form class="dashboard-admin-event-form"
                  on:submit|preventDefault={trySaveAsync}>
                <Input
                      classes="dashboard-admin-event-title input"
                      id="dashboard-admin-event-title"
                      labelText="Titel:"
                      placeholderText="Titel"
                      ariaLabel="Gib den Titel des ausgewählten Events ein."
                      bind:value={currentEvent.title}
                      on:submit={trySaveAsync}
                      on:input={setUnsavedChanges}
                />
                <Input
                      classes="dashboard-admin-event-sub-title input"
                      id="dashboard-admin-event-sub-title"
                      labelText="Untertitel:"
                      placeholderText="Untertitel"
                      ariaLabel="Gib den Untertitel des ausgewählten Events ein."
                      bind:value={currentEvent.subtitle}
                      on:submit={trySaveAsync}
                      on:input={setUnsavedChanges}
                />
                <div class="dashboard-admin-event-time-date-wrapper">
                    <Input
                          id="dashboard-admin-event-start-date"
                          labelText="Start Datum:"
                          type="date"
                          ariaLabel="Gib das Start Datum des ausgewählten Events ein."
                          bind:value={currentEvent.start_date}
                          on:submit={trySaveAsync}
                          on:input={setUnsavedChanges}
                    />
                    <Input
                          id="dashboard-admin-event-end-date"
                          labelText="End Datum:"
                          type="date"
                          ariaLabel="Gib das End Datum des ausgewählten Events ein."
                          bind:value={currentEvent.end_date}
                          on:submit={trySaveAsync}
                          on:input={setUnsavedChanges}
                    />
                </div>
                <div class="dashboard-admin-event-time-date-wrapper">
                    <Input
                          id="dashboard-admin-event-publish-event-date"
                          labelText="Veröffentlichungsdatum Event:"
                          type="datetime-local"
                          ariaLabel="Gib das Veröffentlichungsdatum des ausgewählten Events ein."
                          bind:value={currentEvent.publish_date}
                          on:submit={trySaveAsync}
                          on:input={setUnsavedChanges}
                    />
                    <Input
                          id="dashboard-admin-event-publish-shedule-date"
                          labelText="Veröffentlichungsuhrzeit Ablaufplan:"
                          type="datetime-local"
                          ariaLabel="Gib das Veröffentlichungsdatum des Ablaufplanes des ausgewählten Events ein."
                          bind:value={currentEvent.schedule_visible_from}
                          on:submit={trySaveAsync}
                          on:input={setUnsavedChanges}
                    />
                </div>
                <div class="dashboard-admin-event-time-date-wrapper">
                    <Input
                          id="dashboard-admin-event-call-for-papers-start-date"
                          labelText="Anmeldestart:"
                          type="datetime-local"
                          ariaLabel="Gib den Start der Anmeldefrist des ausgewählten Events ein."
                          bind:value={currentEvent.call_for_papers_start}
                          on:submit={trySaveAsync}
                          on:input={setUnsavedChanges}
                    />
                    <Input
                          id="dashboard-admin-event-call-for-papers-end-date"
                          labelText="Anmeldeende:"
                          type="datetime-local"
                          ariaLabel="Gib das Ende der Anmeldefrist des ausgewählten Events ein."
                          bind:value={currentEvent.call_for_papers_end}
                          on:submit={trySaveAsync}
                          on:input={setUnsavedChanges}
                    />
                </div>
                <Input
                      classes="dashboard-admin-event-twitch-url input"
                      id="dashboard-admin-event-twitch-url"
                      labelText="Twitch URL:"
                      placeholderText="Twitch URL:"
                      ariaLabel="Gib die URL der Twitchseite des ausgewählten Events ein."
                      bind:value={currentEvent.twitch_url}
                      on:submit={trySaveAsync}
                      on:input={setUnsavedChanges}
                />
                <Input
                      classes="dashboard-admin-event-discord-url input"
                      id="dashboard-admin-event-discord-url"
                      labelText="Discord URL:"
                      placeholderText="Discord URL:"
                      ariaLabel="Gib die URL des Discordservers des ausgewählten Events ein."
                      bind:value={currentEvent.discord_url}
                      on:submit={trySaveAsync}
                      on:input={setUnsavedChanges}
                />
                <Input
                      classes="dashboard-admin-event-presskit-url input"
                      id="dashboard-admin-event-presskit-url"
                      labelText="Presskit URL:"
                      placeholderText="Presskit URL:"
                      ariaLabel="Gib die URL des Presskits des ausgewählten Events ein."
                      bind:value={currentEvent.presskit_url}
                      on:submit={trySaveAsync}
                      on:input={setUnsavedChanges}
                />
                <Input
                      classes="dashboard-admin-event-youtube-trailer-id input"
                      id="dashboard-admin-event-youtube-trailer-id"
                      labelText="YouTube Trailer ID:"
                      placeholderText="YouTube Trailer ID:"
                      ariaLabel="Gib die ID des YouTube Trailer des ausgewählten Events ein."
                      bind:value={currentEvent.trailer_youtube_id}
                      on:submit={trySaveAsync}
                      on:input={setUnsavedChanges}
                />
                <Input
                      classes="dashboard-admin-event-description-headline input"
                      id="dashboard-admin-event-description-headline"
                      labelText="Überschrift Beschreibung:"
                      placeholderText="Überschrift Beschreibung:"
                      ariaLabel="Gib die Überschrift der Eventbeschreibung des ausgewählten Events ein."
                      bind:value={currentEvent.description_headline}
                      on:submit={trySaveAsync}
                      on:input={setUnsavedChanges}
                />
                <TextArea
                      classes="dashboard-admin-event-description input"
                      id="dashboard-admin-event-description"
                      labelText="Beschreibung:"
                      placeholderText="Beschreibung"
                      ariaLabel="Gib den Eventbeschreibungstext des ausgewählten Events ein."
                      bind:value={currentEvent.description}
                      on:submit={trySaveAsync}
                      on:input={setUnsavedChanges}
                />

                <SubHeadline classes="dashboard-admin-event-event-subheadline">Speaker</SubHeadline>

                {#if copiedData.value.allSpeaker.length > 0}
                    <div class="dashboard-admin-event-speaker-wrapper">
                        {#each copiedData.value.allSpeaker as speaker}
                            <Input
                                  classes="dashboard-admin-event-speaker-date input"
                                  id="dashboard-admin-event-speaker-date-{speaker.id}"
                                  labelText="{speaker.name}:"
                                  placeholderText="{speaker.name}:"
                                  type="datetime-local"
                                  ariaLabel="Gib das Veröffentlichungsdatum von {speaker.name} für das ausgewählte Event an."
                                  bind:value={speaker.visible_from}
                                  on:submit={trySaveAsync}
                                  on:input={setUnsavedChanges}
                            />
                        {/each}
                    </div>
                {:else}
                    <TextLine>Keine Speaker bei diesem Event registriert.</TextLine>
                {/if}

                <Button
                      classes="dashboard-admin-event-submit-button"
                      type={'submit'}
                      ariaLabel="Klicke zum Speichern"
                >
                    Speichern
                </Button>
            </form>
        {:else}
            <TextLine>Kein aktuelles Event</TextLine>
        {/if}
    {:else}
        <TextLine>Keine Events</TextLine>
    {/if}
</SectionDashboard>

<style>
    :global(.dashboard-admin-event-section) {
        max-width:      100rem;
        display:        flex;
        flex-direction: column;
    }

    .dashboard-admin-event-message-wrapper {
        display:        flex;
        flex-direction: column;
        margin:         var(--2x-margin) 0;
    }

    :global(.dashboard-admin-event-new-event-button) {
        align-self: center;
        margin-top: var(--2x-margin);
    }

    :global(.dashboard-admin-event-event-subheadline) {
        justify-self: center;
        margin-top:   var(--4x-margin);
    }

    .dashboard-admin-event-form {
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
    }

    .dashboard-admin-event-time-date-wrapper {
        display:        flex;
        flex-direction: row;
        gap:            var(--full-gap);
    }

    .dashboard-admin-event-speaker-wrapper {
        display:   flex;
        width:     100%;
        gap:       var(--full-gap);
        flex-wrap: wrap;
    }

    :global(.dashboard-admin-event-speaker-date) {
        flex: 0;
    }

    :global(.dashboard-admin-event-submit-button) {
        margin-top: var(--2x-margin);
        align-self: center;
    }
</style>
