<script lang="ts">
    import type {LoadDashboard, LoadSpeakerTeamMemberEvent} from 'types/dashboardLoadTypes';
    import type {SetSpeakerTeamMemberEvent} from 'types/dashboardSetTypes';
    import type {Menu, MenuItem} from 'types/provideTypes';
    import type {ValidateReturn} from 'pageHelper/speakerTeamMemberEvent';
    import type {CropperProps} from "types/cropperTypes";

    import {_unsavedChanges} from 'stores/saved';
    import {SaveMessageType} from 'types/saveMessageType';
    import {trySaveDataAsync} from 'helper/trySaveData.js';
    import {scrollToTop} from 'helper/scroll';
    import {loadSpeakerTeamMemberAsync, validate} from 'pageHelper/speakerTeamMemberEvent';

    import Tabs from 'elements/navigation/tabs.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import Message from 'elements/text/message.svelte';
    import SpeakerTeamMemberEventForm from 'forms/speakerTeamMemberEventForm.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';
    import Explanation from 'elements/text/explanation.svelte';

    export let data: LoadDashboard & LoadSpeakerTeamMemberEvent;
    export let type: 'speaker' | 'team-member';
    export let menu: Menu;
    export let menuItem: MenuItem;
    export let explanation: string;

    let saveMessage: SaveMessage;
    let errorList: string[] = [];

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
        const newImage: Blob | null = form.getNewImage();
        const cropperProps: CropperProps = form.getCropperProps();

        let toSave: SetSpeakerTeamMemberEvent = {
            name: data.event.name.trim(),
            short_bio: data.event.short_bio.trim(),
            bio: data.event.bio.trim(),
            photo_x: Math.floor(cropperProps.x),
            photo_y: Math.floor(cropperProps.y),
            photo_size: Math.floor(cropperProps.width), // does not matter since we're saving 300 x 300 px here
        };

        const returnValue: ValidateReturn = validate(toSave);
        toSave = returnValue.data;
        if (returnValue.messages.length > 0) {
            errorList = returnValue.messages;
            return false;
        } else {
            errorList = [];
        }

        const formData = new FormData();
        formData.append('json', JSON.stringify(toSave));
        if (newImage) {
            formData.append('photo', newImage);
        }

        const response = await trySaveDataAsync(
            fetch,
            formData,
            `/dashboard/${type}/event/${data.current.event_id}`,
            'POST',
        );

        saveMessage.setSaveMessage(response.success ? SaveMessageType.Save : SaveMessageType.Error);
        errorList = response.messages;

        if (response.success) {
            data.event = await loadSpeakerTeamMemberAsync(fetch, data.current.event_id, type);
        }

        return response.success;
    }
</script>

<Tabs classes="subpage-navigation-tabs"
      position="center"
      entries={menu}
      entryName={menuItem.name}/>
<UnsavedChangesCallbackWrapper callback={trySaveAsync}/>

<SectionDashboard classes="standard-dashboard-section">
    <Explanation>
        {@html explanation}
    </Explanation>
    <NavigationDropDown
            id="dashboard-speaker-event-drop-down"
            labelText="Event:"
            data={data.allEvents.map((x) => x.title)}
            on:navigated={ (e) => { updateDisplayedAsync(e.detail); }}
    />
    <div class="dashboard-speaker-event-message-wrapper">
        {#if $_unsavedChanges}
            <Message message="Es gibt ungesicherte Änderungen."/>
        {:else if data.event.is_approved}
            <Message message="Dieser Datensatz ist freigegeben."
                     color="success"/>
        {:else}
            <Message message="Dieser Datensatz muss noch freigegeben werden."/>
        {/if}
        {#if data.event.requested_changes}
            <Message
                    message={`Änderungswünsche:\n ${data.event.requested_changes}`}
                    classes="message-pre-wrap"
            />
        {/if}
        <SaveMessage bind:this={saveMessage}/>
        <MessageWrapper messages={errorList}/>
    </div>
    <SpeakerTeamMemberEventForm bind:this={form}
                                data={data}
                                on:save={trySaveAsync}/>

</SectionDashboard>

<style>
    .dashboard-speaker-event-message-wrapper {
        margin: var(--full-margin) 0;
    }
</style>
