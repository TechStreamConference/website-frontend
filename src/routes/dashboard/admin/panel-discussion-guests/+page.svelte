<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/dashboardItems';

    import type {LoadAdminGuests} from 'types/dashboardLoadTypes';
    import type {DashboardAllPersons} from 'types/dashboardProvideTypes';

    import {loadPossibleGuestsOfTalk, loadTalksOfEvent} from './guests-helper';
    import {setUnsavedChanges} from 'stores/saved';
    import {trySaveDataAsync} from 'helper/trySaveData.js';
    import {SaveMessageType} from 'types/saveMessageType';
    import {onMount} from 'svelte';
    import {getElementByID} from 'helper/basic';
    import {getDropDownEntriesWithID, getIdFromDropDownEntry} from 'helper/navigation';
    import {scrollToTop} from 'helper/scroll'

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import PersonArray from 'elements/input/personArray.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import Button from 'elements/input/button.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
    import GeneralPopup from 'elements/popups/generalPopup.svelte'

    export let data: LoadAdminGuests;
    let talkDropDown: NavigationDropDown;
    let selectedArray: DashboardAllPersons = [];
    let currentTalkId: number = 0;

    let message: SaveMessage;
    let errorList: string[] = [];

    let clearPopup: GeneralPopup;

    onMount(() => {
        if (data.talksOfEvent.length > 0) {
            const entry = talkDropDown.getSelected();
            if (typeof entry !== 'string') {
                console.error('selected is no string by initialisation');
                return;
            }
            currentTalkId = getIdFromDropDownEntry(entry);
            selectedArray = getElementByID(data.talksOfEvent, currentTalkId).guests;
        }
    });

    async function loadNewTalks(selected: string): Promise<void> {
        const id = getIdFromDropDownEntry(selected);

        data.talksOfEvent = await loadTalksOfEvent(fetch, id);

        if (data.talksOfEvent.length === 0) {
            currentTalkId = 0;
            talkDropDown.clear();
            data.guestsOfTalk = [];
            return;
        }

        data.guestsOfTalk = await loadPossibleGuestsOfTalk(fetch, id);
        talkDropDown.trySetSelected(`${data.talksOfEvent[0].id} | ${data.talksOfEvent[0].title}`);
    }

    async function loadNewGuests(selected: string): Promise<void> {
        currentTalkId = getIdFromDropDownEntry(selected);
        selectedArray = getElementByID(data.talksOfEvent, currentTalkId).guests;
        data.guestsOfTalk = await loadPossibleGuestsOfTalk(fetch, currentTalkId);
    }

    async function save(): Promise<boolean> {
        if (currentTalkId === 0) {
            errorList = ['Aktuell ist kein Talk ausgewählt.'];
            message.setSaveMessage(SaveMessageType.Error);
            return false;
        }

        const ids = selectedArray.map(x => x.user_id);

        const result = await trySaveDataAsync(
            fetch,
            {guest_ids: ids},
            `/dashboard/admin/talk/${currentTalkId}/set-guests`,
            'PUT',
        );

        errorList = result.messages;
        message.setSaveMessage(result.success ? SaveMessageType.Save : SaveMessageType.Error);

        scrollToTop();

        if (result.success) {
            getElementByID(data.talksOfEvent, currentTalkId).guests = selectedArray;
        }
        const selected = talkDropDown.getSelected();
        if (typeof selected === 'string') {
            await loadNewGuests(selected);
        } else {
            console.error('selected is no string by save');
        }

        return result.success;
    }

    async function clear(): Promise<void> {
        if (currentTalkId === 0) {
            errorList = ['Aktuell ist kein Talk ausgewählt.'];
            message.setSaveMessage(SaveMessageType.Error);
            return;
        }

        const result = await trySaveDataAsync(fetch, {}, `/dashboard/admin/talk/${currentTalkId}/remove-all-guests`, 'DELETE');

        errorList = result.messages;
        message.setSaveMessage(result.success ? SaveMessageType.Delete : SaveMessageType.DeleteError);

        if (result.success) {
            getElementByID(data.talksOfEvent, currentTalkId).guests = [];
        }
        const selected = talkDropDown.getSelected();
        if (typeof selected === 'string') {
            await loadNewGuests(selected);
        } else {
            console.error('selected is no string by save');
        }

        scrollToTop();
    }
</script>

<UnsavedChangesCallbackWrapper callback={save}/>
<GeneralPopup bind:this={clearPopup}
              acceptButtonText="Löschen"
              acceptCallback={clear}
              denyButtonText="Abbrechen"
              denyCallback={() => {}}
              headline="Alle Gäste löschen?"
              text="Hiermit werden alle Gäste von dem ausgewählten Talk gelöscht. Hinweis: Der Host zählt nicht als Gast."
/>

<Tabs classes="subpage-navigation-tabs"
      position="center"
      entries={Menu.admin}
      entryName={MenuItem.adminPanelDiscussionGuests.name}/>

<SectionDashboard classes="standard-dashboard-section">
    <NavigationDropDown id="dashboard-admin-guest-year"
                        labelText="Aktuelles Jahr:"
                        data={getDropDownEntriesWithID(data.allEvents)}
                        on:navigated={(e) => { loadNewTalks(e.detail); }}/>
    <NavigationDropDown id="dashboard-admin-guest-talk"
                        labelText="Aktueller Talk:"
                        data={getDropDownEntriesWithID(data.talksOfEvent)}
                        on:navigated={(e) => { loadNewGuests(e.detail); }}
                        bind:this={talkDropDown}/>
    <SaveMessage bind:this={message}/>
    <MessageWrapper messages={errorList}/>
    <PersonArray labelText="Mögliche Gäste:"
                 data={data.guestsOfTalk}
                 bind:selected={selectedArray}
                 on:toggle={setUnsavedChanges}/>
    {#if data.talksOfEvent.length > 0}
        <div class="dashboard-guests-button-wrapper">
            <Button ariaLabel="Klicke hier, um die ausgehwählen Gäste zu speichern."
                    on:click={save}>Speichern
            </Button>
            <Button ariaLabel="Klicke hier, um alle Gäste zu entfernen."
                    on:click={() => { clearPopup.show(""); } }>Alle Gäste entfernen
            </Button>
        </div>
    {/if}
</SectionDashboard>

<style>
    .dashboard-guests-button-wrapper {
        margin: 0 auto;
    }
</style>
