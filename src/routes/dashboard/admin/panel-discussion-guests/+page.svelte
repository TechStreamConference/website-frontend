<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadAdminGuests } from 'types/dashboardLoadTypes';

    import { getNavigationEntries, loadPossibleGuestsOfTalk, loadTalksOfEvent, parseIdOfEntry } from './guests-helper';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import TextLine from 'elements/text/textLine.svelte';

    export let data: LoadAdminGuests;
    let talkDropDown: NavigationDropDown;

    async function loadNewTalks(selected: string): Promise<void> {
        const id = parseIdOfEntry(selected);

        data.talksOfEvent = await loadTalksOfEvent(fetch, id);

        if (data.talksOfEvent.length === 0) {
            talkDropDown.clear();
            data.guestsOfTalk = [];
            return;
        }

        data.guestsOfTalk = await loadPossibleGuestsOfTalk(fetch, id);
        talkDropDown.trySetSelected(`${data.talksOfEvent[0].id} | ${data.talksOfEvent[0].title}`);
    }

    async function loadNewGuests(selected: string): Promise<void> {
        const id          = parseIdOfEntry(selected);
        data.guestsOfTalk = await loadPossibleGuestsOfTalk(fetch, id);
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

    {#each data.guestsOfTalk as guest}
        <TextLine>{guest.name}</TextLine>
    {/each}
</SectionDashboard>

<style>

</style>
