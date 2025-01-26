<script lang="ts">
    import type { LoadDashboard, LoadSpeakerTeamMemberEvent } from 'types/dashboardLoadTypes';
    import type { SetSpeakerTeamMemberEvent } from 'types/dashboardSetTypes';
    import type { Menu, MenuItem } from 'types/provideTypes';
    import type { NewImage, ValidateReturn } from 'pageHelper/speakerTeamMemberEvent';

    import { _unsavedChanges } from 'stores/saved';
    import { SaveMessageType } from 'types/saveMessageType';
    import { trySaveDataAsync } from 'helper/trySaveData.js';
    import { scrollToTop } from 'helper/scroll';
    import { loadSpeakerTeamMemberAsync, validate } from 'pageHelper/speakerTeamMemberEvent';

    import Tabs from 'elements/navigation/tabs.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import Message from 'elements/text/message.svelte';
    import SpeakerTeamMemberEventForm from './speakerTeamMemberEventForm.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';

    export let data: LoadDashboard & LoadSpeakerTeamMemberEvent;
    export let type: 'speaker' | 'team-member';
    export let menu: Menu;
    export let menuItem: MenuItem;

    let saveMessage: SaveMessage;
    let errorQueue: string[] = [];

    let form: SpeakerTeamMemberEventForm;

    async function updateDisplayedAsync(selected: string): Promise<void> {
        for (let entry of data.allEvents) {
            if (entry.title === selected) {
                data.current = entry;
                break;
            }
        }
        data.event = await loadSpeakerTeamMemberAsync(fetch, data.current.event_id, type);
    }


    async function trySaveAsync(): Promise<boolean> {
        scrollToTop();
        const newImage: NewImage              = form.getNewImage();
        let toSave: SetSpeakerTeamMemberEvent = {
            name:       data.event.name.trim(),
            short_bio:  data.event.short_bio.trim(),
            bio:        data.event.bio.trim(),
            photo_x:    newImage.lastPhotoX,
            photo_y:    newImage.lastPhotoY,
            photo_size: newImage.lastPhotoSize,
        };

        const returnValue: ValidateReturn = validate(toSave);
        toSave                            = returnValue.data;
        if (returnValue.messages.length > 0) {
            errorQueue = returnValue.messages;
            return false;
        } else {
            errorQueue = [];
        }

        const formData = new FormData();
        formData.append('json', JSON.stringify(toSave));
        if (newImage.imageFile) {
            formData.append('photo', newImage.imageFile);
        }

        const response = await trySaveDataAsync(
            formData,
            `/api/dashboard/${type}/event/${data.current.event_id}`,
            'POST',
        );

        saveMessage.setSaveMessage(response.success ? SaveMessageType.Save : SaveMessageType.Error);
        errorQueue = response.messages;

        if (response.success) {
            data.event = await loadSpeakerTeamMemberAsync(fetch, data.current.event_id, type);
        }

        return response.success;
    }
</script>

<Tabs entries={menu}
      entryName={menuItem.name}
      classes="navigation-tabs-dashboard-subpage" />
<UnsavedChangesCallbackWrapper callback={trySaveAsync} />

<SectionDashboard classes="dashboard-speaker-event-section">
    <NavigationDropDown
          id="dashboard-speaker-event-drop-down"
          labelText="Event:"
          data={data.allEvents.map((x) => x.title)}
          on:navigated={ (e) => { updateDisplayedAsync(e.detail); }}
    />
    <div class="dashboard-speaker-event-message-wrapper">
        {#if $_unsavedChanges}
            <Message message="Es gibt ungesicherte Änderungen." />
        {:else if data.event.is_approved}
            <Message message="Dieser Datensatz ist freigegeben."
                     color="success" />
        {:else}
            <Message message="Dieser Datensatz muss noch freigegeben werden." />
        {/if}
        {#if data.event.requested_changes}
            <Message
                  message={`Änderungswünsche:\n ${data.event.requested_changes}`}
                  classes="message-pre-wrap"
            />
        {/if}
        <SaveMessage bind:this={saveMessage} />
        <MessageWrapper messages={errorQueue} />
    </div>
    <SpeakerTeamMemberEventForm bind:this={form}
                                data={data}
                                on:save={trySaveAsync} />

</SectionDashboard>

<style>
    :global(.dashboard-speaker-event-section) {
        max-width:      100rem;
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
    }

    .dashboard-speaker-event-message-wrapper {
        margin: var(--full-margin) 0;
    }
</style>
