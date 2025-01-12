<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadSpeakerTalk } from 'types/dashboardLoadTypes';

    import Tabs from 'elements/navigation/tabs.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';

    export let data: LoadSpeakerTalk;

    async function save(): Promise<boolean> {
        console.log('save');
        return true;
    }

    function updateDisplayedEvent(selected: string): void {
        console.log(`updateDisplayedEvent: ${selected}`);
    }

    function updateDisplayedTalk(selected: string): void {
        console.log(`updateDisplayedTalk: ${selected}`);
    }
</script>


<Tabs entries={Menu.speaker}
      entryName={MenuItem.speakerTalk.name}
      classes="navigation-tabs-dashboard-subpage" />
<UnsavedChangesCallbackWrapper callback={save} />

<SectionDashboard classes="standard-dashboard-section">
    <NavigationDropDown id="dashboard-speaker-talk-event-navigation"
                        labelText="Event:"
                        data={ data.allEvent.map(x => x.title) }
                        on:navigated={ (e) => { updateDisplayedEvent(e.detail); }} />
    <NavigationDropDown id="dashboard-speaker-talk-talk-navigation"
                        labelText="Talk:"
                        data={ data.allTalks.map(x => x.title) }
                        on:navigated={ (e) => { updateDisplayedTalk(e.detail); }} />

</SectionDashboard>
