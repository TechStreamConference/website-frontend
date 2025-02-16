<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadAdminGuests } from 'types/dashboardLoadTypes';
    import type { DashboardAllPersons } from 'types/dashboardProvideTypes';

    import { getNavigationEntries, loadPossibleGuestsOfTalk, loadTalksOfEvent, parseIdOfEntry } from './guests-helper';
    import { setUnsavedChanges } from 'stores/saved';
    import { trySaveDataAsync } from 'helper/trySaveData.js';
    import { SaveMessageType } from 'types/saveMessageType';
    import { onMount } from 'svelte';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import PersonArray from 'elements/input/personArray.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import Button from 'elements/input/button.svelte';

    export let data: LoadAdminGuests;
    let talkDropDown: NavigationDropDown;
    let selected: DashboardAllPersons = [];
    let currentTalkId: number         = 0;

    let message: SaveMessage;
    let errorList: string[] = [];

    onMount(() => {
        if (data.talksOfEvent.length > 0) {
            const entry = talkDropDown.getSelected();
            if (typeof entry !== 'string') {
                console.error('selected is no string by initialisation');
                return;
            }
            currentTalkId = parseIdOfEntry(entry);
        }
    });

    async function loadNewTalks(selected: string): Promise<void> {
        const id = parseIdOfEntry(selected);

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
        currentTalkId = parseIdOfEntry(selected);
        data.guestsOfTalk = await loadPossibleGuestsOfTalk(fetch, currentTalkId);
    }

    async function save(): Promise<boolean> {
        if (currentTalkId === 0) {
            errorList = ['Aktuell ist kein Talk ausgewählt.'];
            message.setSaveMessage(SaveMessageType.Error);
            return false;
        }

        const ids = selected.map(x => x.user_id);
        console.log(selected);
        console.log(ids);

        const result = await trySaveDataAsync(
            fetch,
            { guest_ids: ids },
            `/api/dashboard/admin/talk/${currentTalkId}/set-guests`,
            'PUT',
        );

        errorList = result.messages;
        message.setSaveMessage(result.success ? SaveMessageType.Save : SaveMessageType.Error);

        return result.success;
    }
</script>

<Tabs
      entries={Menu.admin}
      entryName={MenuItem.adminPanelDiscussionGuests.name}
      classes="navigation-tabs-dashboard-subpage"
/>

<SectionDashboard classes="standard-dashboard-section">
    <NavigationDropDown id="dashboard-admin-guest-year"
                        labelText="Aktuelles Jahr:"
                        data={getNavigationEntries(data.allEvents)}
                        on:navigated={(e) => { loadNewTalks(e.detail); }} />
    <NavigationDropDown id="dashboard-admin-guest-talk"
                        labelText="Aktueller Talk:"
                        data={getNavigationEntries(data.talksOfEvent)}
                        on:navigated={(e) => { loadNewGuests(e.detail); }}
                        bind:this={talkDropDown} />
    <SaveMessage bind:this={message} />
    <MessageWrapper messages={errorList} />
    <PersonArray labelText="Mögliche Gäste:"
                 data={data.guestsOfTalk}
                 bind:selected={selected}
                 on:toggle={setUnsavedChanges} />
    <Button ariaLabel="Klicke hier, um die ausgehwählen Gäste zu speichern."
            on:click={save}>Speichern
    </Button>
</SectionDashboard>

<style>

</style>
