<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

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

    export let data: LoadAdminCreatePanelDiscussion;

    let talkData: DashboardPendingTalk     = initializePendingTalk();
    let selectedHosts: DashboardAllPersons = [];
    let currentEventId: number             = 0;

    let eventDropDown: NavigationDropDown;

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
        console.log(currentEventId);
        console.log(talkData);
        console.log(selectedHosts);
        return false;
    }
</script>

<Tabs classes="navigation-tabs-dashboard-subpage"
      entries={Menu.admin}
      entryName={MenuItem.adminCreatePanelDiscussion.name} />

<SectionDashboard classes="standard-dashboard-section">
    <NavigationDropDown bind:this={eventDropDown}
                        labelText="Aktuelles Jahr:"
                        id="dashboard-admin-create-panel-discussion-event-drop-down"
                        data={getDropDownEntriesWithID(data.allEvents)}
                        on:navigated={(e) => {onNavigate(e.detail)}} />
    <form class="dashboard-admin-create-panel-discussion-form"
          on:submit|preventDefault={save}>
        <SpeakerTalkForm data={talkData}
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
</style>
