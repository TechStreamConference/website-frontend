<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/dashboardItems';

    import type { LoadAdminEvents, LoadDashboard } from 'types/dashboardLoadTypes';
    import type { DashboardAllEventSpeaker, DashboardEvent } from 'types/dashboardProvideTypes';

    import { onMount } from 'svelte';
    import { loadSpeaker } from './eventsHelper';
    import { convertTimeAndDateToHTML } from 'helper/dates';
    import { getElementByTitle } from 'helper/basic';

    import TextLine from 'elements/text/textLine.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import Tabs from 'elements/navigation/tabs.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import AdminEventForm from 'forms/adminEventForm.svelte';

    export let data: LoadDashboard & LoadAdminEvents;

    let navigationDropDown: NavigationDropDown;

    let currentEvent: DashboardEvent;

    onMount(() => {
        const selected = navigationDropDown.getSelected();
        if (typeof selected !== 'string') {
            console.error('selected has wrong type');
            return;
        }
        updateDisplayed(selected);
    });

    function updateDisplayed(title: string): void {
        currentEvent                       = getElementByTitle(data.allEvents, title);
        currentEvent.publish_date          = convertTimeAndDateToHTML(currentEvent.publish_date);
        currentEvent.schedule_visible_from = convertTimeAndDateToHTML(currentEvent.schedule_visible_from);
        currentEvent.call_for_papers_start = convertTimeAndDateToHTML(currentEvent.call_for_papers_start);
        currentEvent.call_for_papers_end   = convertTimeAndDateToHTML(currentEvent.call_for_papers_end);

        loadSpeaker(fetch, currentEvent.id).then((newData: DashboardAllEventSpeaker) => {
            data.allSpeaker = newData;
        }, () => {
            /**
             * This is a tradeoff here.
             * By using then and providing this lambda I do not need to make this function async.
             * To have this function not async makes this component way easier.
             * So I catch the throw(406) and just display an error in the console.
             */
            data.allSpeaker = [];
            console.error(`not able to load speaker data from event ${currentEvent.id}`);
        });
    }

</script>

<Tabs
      entries={Menu.admin}
      entryName={MenuItem.adminEvents.name}
      classes="navigation-tabs-dashboard-subpage"
/>
<SectionDashboard classes="dashboard-admin-event-section">
    {#if data.allEvents}
        <NavigationDropDown
              id={'dashboard-admin-event-drop-down'}
              data={data.allEvents.map(x => x.title)}
              labelText="Aktuelles Event:"
              on:navigated={ (e) => { updateDisplayed(e.detail); }}
              bind:this={navigationDropDown}
        />
        {#if currentEvent}
            <AdminEventForm classes="dashboard-admin-event-form"
                            speakerArray={data.allSpeaker}
                            event={currentEvent} />
        {:else}
            <TextLine>Kein aktuelles Event</TextLine>
        {/if}
    {:else}
        <TextLine>Keine Events</TextLine>
    {/if}
</SectionDashboard>

<style>
    :global(.dashboard-admin-event-section) {
        max-width:      100rem;
        display:        flex;
        flex-direction: column;
    }

    :global(.dashboard-admin-event-form) {
        margin-top: var(--4x-margin);
    }
</style>
