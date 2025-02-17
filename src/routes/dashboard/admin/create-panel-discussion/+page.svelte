<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadAdminCreatePanelDiscussion } from 'types/dashboardLoadTypes';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import { getDropDownEntriesWithID, getIdFromDropDownEntry } from 'helper/navigation';
    import { error } from '@sveltejs/kit';
    import { loadPossibleHosts } from './panelHelper';

    export let data: LoadAdminCreatePanelDiscussion;

    let currentEventId: number = 0;

    async function onNavigate(dropDownEntry: string): Promise<void> {
        currentEventId = getIdFromDropDownEntry(dropDownEntry);
        if (currentEventId === 0) {
            throw error(404);
        }

        data.possibleHosts = await loadPossibleHosts(fetch, currentEventId);
    }
</script>

<Tabs classes="navigation-tabs-dashboard-subpage"
      entries={Menu.admin}
      entryName={MenuItem.adminCreatePanelDiscussion.name} />

<SectionDashboard classes="standard-dashboard-section">
    <NavigationDropDown labelText="Aktuelles Jahr:"
                        id="dashboard-admin-create-panel-discussion-event-drop-down"
                        data={getDropDownEntriesWithID(data.allEvents)}
                        on:navigated={(e) => {onNavigate(e.detail)}} />
</SectionDashboard>


<style>

</style>
