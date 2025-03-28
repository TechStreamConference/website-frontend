<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/dashboardItems';

    import type { LoadAdminCreatePanelDiscussion } from 'types/dashboardLoadTypes';
    import type { DashboardAllPersons, DashboardPendingTalk } from 'types/dashboardProvideTypes';

    import { getDropDownEntriesWithID, getIdFromDropDownEntry } from 'helper/navigation';
    import { error } from '@sveltejs/kit';
    import { initializePendingTalk, loadPossibleHosts } from './panelHelper';
    import { onMount } from 'svelte';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import SpeakerTalkForm from 'forms/speakerTalkForm.svelte';
    import PersonArray from 'elements/input/personArray.svelte';
    import Button from 'elements/input/button.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import { SaveMessageType } from 'types/saveMessageType';
    import { trySaveDataAsync } from 'helper/trySaveData.js';
    import { scrollToTop } from 'helper/scroll';

    enum State {
        Default,
        Saved,
    }

    export let data: LoadAdminCreatePanelDiscussion;
    let currentState = State.Default;

    let talkData: DashboardPendingTalk     = initializePendingTalk();
    let selectedHosts: DashboardAllPersons = [];
    let currentEventId: number             = 0;

    let eventDropDown: NavigationDropDown;
    let message: SaveMessage;
    let errorList: string[] = [];

    onMount(() => {
        const entry = eventDropDown.getSelected();
        if (typeof entry !== 'string') {
            console.error(`selected entry is not a string: '${entry}'`);
            return;
        }
        currentEventId = getIdFromDropDownEntry(entry);
    });

    async function onNavigate(dropDownEntry: string): Promise<void> {
        currentEventId = getIdFromDropDownEntry(dropDownEntry);
        if (currentEventId === 0) {
            throw error(404);
        }

        data.possibleHosts = await loadPossibleHosts(fetch, currentEventId);
        talkData           = initializePendingTalk();
    }

    async function save(): Promise<boolean> {
        scrollToTop();
        if (currentEventId === 0) {
            errorList = ['Hier ist etwa gant schief gelaufen.'];
            return false;
        }

        if (selectedHosts.length > 1) {
            errorList = ['Es ist nicht möglich mehr als einen Host auszuwählen.'];
            return false;
        }
        if (selectedHosts.length === 0) {
            errorList = ['Wähle einen Host aus.'];
            return false;
        }

        const toSave = {
            event_id:           currentEventId,
            user_id:            selectedHosts[0].user_id,
            title:              talkData.title,
            description:        talkData.description,
            tag_ids:            talkData.tags.map((x) => x.id),
            possible_durations: talkData.possible_durations,
        };

        const result = await trySaveDataAsync(fetch, toSave, '/dashboard/admin/talk/create', 'POST');

        errorList = result.messages;
        message.setSaveMessage(result.success ? SaveMessageType.Save : SaveMessageType.Error);
        currentState = result.success ? State.Saved : State.Default;

        return result.success;
    }
</script>

<Tabs classes="subpage-navigation-tabs subpage-navigation-tabs-wide-tabs-override"
      position="center"
      entries={Menu.admin}
      entryName={MenuItem.adminCreatePanelDiscussion.name} />

<SectionDashboard classes="standard-dashboard-section wide-dashboard-section-override">
    {#if currentState === State.Default}
        <NavigationDropDown bind:this={eventDropDown}
                            labelText="Aktuelles Jahr:"
                            id="dashboard-admin-create-panel-discussion-event-drop-down"
                            data={getDropDownEntriesWithID(data.allEvents)}
                            on:navigated={(e) => {onNavigate(e.detail)}} />
        <SaveMessage bind:this={message} />
        <MessageWrapper messages={errorList} />
        <form class="dashboard-admin-create-panel-discussion-form form-border"
              on:submit|preventDefault={save}>
            <SpeakerTalkForm bind:data={talkData}
                             tags={data.tags}
                             talkDurations={data.durations}
                             useForm={false} />
            <PersonArray labelText="Mögliche Hosts:"
                         bind:selected={selectedHosts}
                         data={data.possibleHosts} />
            <Button classes="dashboard-admin-create-panel-discussion-button"
                    type="submit"
                    ariaLabel="Klicke hier, um den die neue Gesprächsrunde zu speichern">Speichern
            </Button>
        </form>
    {:else}
        <TextLine classes="text-line-center dashboard-admin-create-panel-discussion-success-text">Neue Gesprächsrunde
                                                                                                  erfolgreich
                                                                                                  hinzugefügt.
        </TextLine>
    {/if}
</SectionDashboard>


<style>
    .dashboard-admin-create-panel-discussion-form {
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
    }

    :global(.dashboard-admin-create-panel-discussion-button) {
        align-self: center;
        margin-top: var(--2x-margin);
    }

    :global(.dashboard-admin-create-panel-discussion-success-text) {
        margin-top: var(--8x-margin);
    }
</style>
