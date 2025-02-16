<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadAdminGuests } from 'types/dashboardLoadTypes';

    import { getNavigationEntries } from './guests-helper';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import TextLine from 'elements/text/textLine.svelte';

    export let data: LoadAdminGuests;
</script>

<Tabs
      entries={Menu.admin}
      entryName={MenuItem.adminPanelDiscussionGuests.name}
      classes="navigation-tabs-dashboard-subpage"
/>

<SectionDashboard classes="standard-dashboard-section">
    <NavigationDropDown id="dashboard-admin-guest-year"
                        labelText="Aktuelles Jahr:"
                        data={getNavigationEntries(data.allEvents)} />
    <NavigationDropDown id="dashboard-admin-guest-talk"
                        labelText="Aktueller Talk:"
                        data={getNavigationEntries(data.talksOfEvent)} />

    {#each data.guestsOfTalk as guest}
        <TextLine>{guest.name}</TextLine>
    {/each}
</SectionDashboard>

<style>

</style>
