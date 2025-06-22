<script lang="ts">
    import type { DashboardAllEventSpeaker, DashboardEvent } from 'types/dashboardProvideTypes';
    import type { SetAdminEvent, SetAllAdminEventSpeaker } from 'types/dashboardSetTypes';
    import type { SaveResult } from 'helper/trySaveData';

    import { resetUnsavedChanges, setUnsavedChanges } from 'stores/saved';
    import { scrollToTop } from 'helper/scroll';
    import { combineSaveResult, trySaveDataAsync, trySaveDataAsyncOutReset } from 'helper/trySaveData';
    import { SaveMessageType } from 'types/saveMessageType';
    import {convertSaveEventData, convertSaveSpeakerData, validateData} from "../routes/dashboard/admin/events/eventsHelper";
    import { createEventDispatcher } from 'svelte';

    import Input from 'elements/input/input.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import Button from 'elements/input/button.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';

    const dispatcher = createEventDispatcher();

    export let event: DashboardEvent;
    export let speakerArray: DashboardAllEventSpeaker | undefined = undefined;
    export let classes: string                                    = '';
    export let setSaveCallback: boolean                           = true;

    let message: SaveMessage;
    let errorList: string[] = [];


    async function trySaveAsync(): Promise<boolean> {
        scrollToTop();
        const toSaveEvent: SetAdminEvent             = convertSaveEventData(event);
        const toSaveSpeaker: SetAllAdminEventSpeaker = convertSaveSpeakerData(speakerArray);

        errorList = validateData(toSaveEvent, toSaveSpeaker);
        if (errorList.length > 0) {
            message.setSaveMessage(SaveMessageType.Error);
            return false;
        }


        const result: SaveResult = await (async () => {
            if (toSaveEvent.id === 0) {
                return await trySaveDataAsync(fetch, toSaveEvent, '/dashboard/admin/event/new', 'POST');
            }

            // manually reset unsaved changes to ensure that they are only reset if both Api calls were successful
            const resultEventPromise   = trySaveDataAsyncOutReset(
                fetch,
                toSaveEvent,
                `/dashboard/admin/event/${toSaveEvent.id}`,
                'PUT',
            );
            const resultSpeakerPromise = trySaveDataAsyncOutReset(
                fetch,
                toSaveSpeaker,
                `/dashboard/admin/event/${toSaveEvent.id}/speaker`,
                'PUT',
            );

            const resultEvent   = await resultEventPromise;
            const resultSpeaker = await resultSpeakerPromise;
            const toReturn      = combineSaveResult(resultEvent, resultSpeaker);

            if (toReturn.success) {
                resetUnsavedChanges();
            }

            return toReturn;

        })();

        message.setSaveMessage(result.success ? SaveMessageType.Save : SaveMessageType.Error);
        errorList = result.messages;

        if (result.success) {
            dispatcher('save');
        }

        return result.success;
    }
</script>


{#if setSaveCallback}
    <UnsavedChangesCallbackWrapper callback={trySaveAsync} />
{/if}

<form class="dashboard-admin-event-form form-border {classes}"
      on:submit|preventDefault={trySaveAsync}>
    <SaveMessage bind:this={message} />
    <MessageWrapper messages={errorList} />
    <SubHeadline classes="dashboard-admin-event-event-subheadline"
    >{event.id === 0 ? "Neues Event" : event.title}</SubHeadline
    >
    <Input
          classes="dashboard-admin-event-title input"
          id="dashboard-admin-event-title"
          labelText="Titel:"
          placeholderText="Titel"
          ariaLabel="Gib den Titel des ausgewählten Events ein."
          bind:value={event.title}
          on:input={setUnsavedChanges}
    />
    <Input
          classes="dashboard-admin-event-sub-title input"
          id="dashboard-admin-event-sub-title"
          labelText="Untertitel:"
          placeholderText="Untertitel"
          ariaLabel="Gib den Untertitel des ausgewählten Events ein."
          bind:value={event.subtitle}
          on:input={setUnsavedChanges}
    />
    <div class="dashboard-admin-event-time-date-wrapper">
        <Input
              id="dashboard-admin-event-start-date"
              labelText="Start Datum:"
              type="date"
              ariaLabel="Gib das Start Datum des ausgewählten Events ein."
              bind:value={event.start_date}
              on:input={setUnsavedChanges}
        />
        <Input
              id="dashboard-admin-event-end-date"
              labelText="End Datum:"
              type="date"
              ariaLabel="Gib das End Datum des ausgewählten Events ein."
              bind:value={event.end_date}
              on:input={setUnsavedChanges}
        />
    </div>
    <div class="dashboard-admin-event-time-date-wrapper">
        <Input
              id="dashboard-admin-event-publish-event-date"
              labelText="Veröffentlichungsdatum Event:"
              type="datetime-local"
              ariaLabel="Gib das Veröffentlichungsdatum des ausgewählten Events ein."
              bind:value={event.publish_date}
              on:input={setUnsavedChanges}
        />
        <Input
              id="dashboard-admin-event-publish-frontend-event-date"
              labelText="Veröffentlichungsdatum Frontpage:"
              type="datetime-local"
              ariaLabel="Gib das Veröffentlichungsdatum des ausgewählten Events auf der Frontpage ein."
              bind:value={event.frontpage_date}
              on:input={setUnsavedChanges}
        />
        <Input
              id="dashboard-admin-event-publish-shedule-date"
              labelText="Veröffentlichungsuhrzeit Ablaufplan:"
              type="datetime-local"
              ariaLabel="Gib das Veröffentlichungsdatum des Ablaufplanes des ausgewählten Events ein."
              bind:value={event.schedule_visible_from}
              on:input={setUnsavedChanges}
        />
    </div>
    <div class="dashboard-admin-event-time-date-wrapper">
        <Input
              id="dashboard-admin-event-call-for-papers-start-date"
              labelText="Anmeldestart:"
              type="datetime-local"
              ariaLabel="Gib den Start der Anmeldefrist des ausgewählten Events ein."
              bind:value={event.call_for_papers_start}
              on:input={setUnsavedChanges}
        />
        <Input
              id="dashboard-admin-event-call-for-papers-end-date"
              labelText="Anmeldeende:"
              type="datetime-local"
              ariaLabel="Gib das Ende der Anmeldefrist des ausgewählten Events ein."
              bind:value={event.call_for_papers_end}
              on:input={setUnsavedChanges}
        />
    </div>
    <Input
          classes="dashboard-admin-event-twitch-url input"
          id="dashboard-admin-event-twitch-url"
          labelText="Twitch URL:"
          placeholderText="Twitch URL:"
          ariaLabel="Gib die URL der Twitchseite des ausgewählten Events ein."
          bind:value={event.twitch_url}
          on:input={setUnsavedChanges}
    />
    <Input
          classes="dashboard-admin-event-discord-url input"
          id="dashboard-admin-event-discord-url"
          labelText="Discord URL:"
          placeholderText="Discord URL:"
          ariaLabel="Gib die URL des Discordservers des ausgewählten Events ein."
          bind:value={event.discord_url}
          on:input={setUnsavedChanges}
    />
    <Input
          classes="dashboard-admin-event-presskit-url input"
          id="dashboard-admin-event-presskit-url"
          labelText="Presskit URL:"
          placeholderText="Presskit URL:"
          ariaLabel="Gib die URL des Presskits des ausgewählten Events ein."
          bind:value={event.presskit_url}
          on:input={setUnsavedChanges}
    />
    <Input
            classes="dashboard-admin-event-youtube-channel-url input"
            id="dashboard-admin-event-youtube-channel-url"
            labelText="YouTube URL:"
            placeholderText="YouTube URL:"
            ariaLabel="Gib die URL des YouTube Kanals des ausgewählten Events ein."
            bind:value={event.youtube_channel_url}
            on:input={setUnsavedChanges}
    />
    <Input
          classes="dashboard-admin-event-trailer-url input"
          id="dashboard-admin-event-trailer-url"
          labelText="Trailer URL:"
          placeholderText="Trailer URL:"
          ariaLabel="Gib die URL des Trailers des ausgewählten Events ein."
          bind:value={event.trailer_url}
          on:input={setUnsavedChanges}
    />
    <Input
            classes="dashboard-admin-event-trailer-poster-url input"
            id="dashboard-admin-event-trailer-poster-url"
            labelText="Trailer Poster URL:"
            placeholderText="Trailer Poster URL:"
            ariaLabel="Gib die URL des Trailer-Posters des ausgewählten Events ein."
            bind:value={event.trailer_poster_url}
            on:input={setUnsavedChanges}
    />
    <Input
          classes="dashboard-admin-event-description-headline input"
          id="dashboard-admin-event-description-headline"
          labelText="Überschrift Beschreibung:"
          placeholderText="Überschrift Beschreibung:"
          ariaLabel="Gib die Überschrift der Eventbeschreibung des ausgewählten Events ein."
          bind:value={event.description_headline}
          on:input={setUnsavedChanges}
    />
    <TextArea
          classes="dashboard-admin-event-description input"
          id="dashboard-admin-event-description"
          labelText="Beschreibung:"
          placeholderText="Beschreibung"
          ariaLabel="Gib den Eventbeschreibungstext des ausgewählten Events ein."
          bind:value={event.description}
          on:submit={trySaveAsync}
          on:input={setUnsavedChanges}
    />

    {#if speakerArray && speakerArray.length > 0}
        <SubHeadline classes="dashboard-admin-event-event-subheadline">Speaker</SubHeadline>
        <div class="dashboard-admin-event-speaker-wrapper">
            {#each speakerArray as speaker}
                <Input
                      classes="dashboard-admin-event-speaker-date input"
                      id="dashboard-admin-event-speaker-date-{speaker.id}"
                      labelText="{speaker.name}:"
                      placeholderText="{speaker.name}:"
                      type="datetime-local"
                      ariaLabel="Gib das Veröffentlichungsdatum von {speaker.name} für das ausgewählte Event an."
                      bind:value={speaker.visible_from}
                      on:input={setUnsavedChanges}
                />
            {/each}
        </div>
    {/if}

    <Button
          classes="dashboard-admin-event-submit-button"
          type={'submit'}
          ariaLabel="Klicke zum Speichern"
    >
        Speichern
    </Button>
</form>

<style>
    .dashboard-admin-event-form {
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
    }

    :global(.dashboard-admin-event-event-subheadline) {
        align-self: center;
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
