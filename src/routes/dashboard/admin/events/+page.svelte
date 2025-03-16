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
    import Button from 'elements/input/button.svelte';
    import GeneralPopup from 'elements/popups/generalPopup.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import Link from 'elements/text/link.svelte';
    import LinkGridEntry from 'elements/link-grid-entry.svelte';
    import Toggle from 'elements/input/toggle.svelte';

    const link    = 'https://coder2k.net/test-conf/?push=jD301AhMw3XzGlcbIdbjxSzW7bUOV7B4dh4fvdpR&room=Rwsk9ZdxWB6bX0dOm3TJiP1XZDmR6b&password=0vmg6uRnfjZ36xM1DRNwztPSEyerAtX9GKezp7xQNUHfbNVMqn&label=anywaygame_cam&maxframerate=30&ssid&g=0';
    const entry   = {
        name:        'anywaygame',
        push_cam:    link,
        push_screen: link,
        view_cam:    link,
        view_screen: link,
    };
    const entries = [
        entry,
        entry,
        entry,
        entry,
        entry,
        entry,
    ];

    let displayCam: boolean    = true;
    let displayScreen: boolean = true;
    let displayPush: boolean   = true;
    let displayView: boolean   = true;

    export let data: LoadDashboard & LoadAdminEvents;

    let navigationDropDown: NavigationDropDown;
    let displayLinkPopup: GeneralPopup;
    let generateLinkPopup: GeneralPopup;
    let sendLinkPopup: GeneralPopup;

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


    async function displayLinksAsync(): Promise<void> {
        console.error('displaying links');
    }

    async function genLinksAsync(): Promise<void> {
        console.error('genLinks');
    }

    async function sendLinksAsync(): Promise<void> {
        console.error('sendLinks');
    }
</script>

<GeneralPopup bind:this={displayLinkPopup}
              headline="Links anzeigen?"
              text="Hinweis: Die Links enthalten sensible Daten wie Passwörter."
              denyButtonText="Nein"
              acceptButtonText="Ja"
              denyCallback={() => {}}
              acceptCallback={displayLinksAsync} />
<GeneralPopup bind:this={generateLinkPopup}
              headline="Links generieren?"
              text="Hinweis: Durch das generieren neuer Links werden die alten (kommunizierten) Links ungültig."
              denyButtonText="Nein"
              acceptButtonText="Ja"
              denyCallback={() => {}}
              acceptCallback={genLinksAsync} />
<GeneralPopup bind:this={sendLinkPopup}
              headline="Links versenden?"
              text="Hinweis: Alle Speaker werden benachrichtigt."
              denyButtonText="Nein"
              acceptButtonText="Ja"
              denyCallback={() => {}}
              acceptCallback={sendLinksAsync} />

<Tabs
      entries={Menu.admin}
      entryName={MenuItem.adminEvents.name}
      classes="navigation-tabs-dashboard-subpage"
/>
<SectionDashboard classes="dashboard-admin-event-section standard-dashboard-section">
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
            <div class="links-wrapper">
                <SubHeadline classes="white">Video Links</SubHeadline>
                <div class="button-array">
                    <Button ariaLabel="Klicke hier, um vorhandene Links anzuzeigen"
                            on:click={ () => { displayLinkPopup.show(""); } }>Links anzeigen
                    </Button>
                    <Button ariaLabel="Klicke hier, um neue Links zu generieren"
                            on:click={ () => { generateLinkPopup.show(""); } }>Links generieren
                    </Button>
                    <Button ariaLabel="Klicke hier, um die vorhandenen Links zu kommunizieren"
                            on:click={ () => { sendLinkPopup.show(""); } }>Links verschicken
                    </Button>
                </div>

                {#if entries.length > 0}
                    <div class="link-grid">
                        <TextLine classes="expand-grid-line">Raum:</TextLine>
                        <Link title="Klicke hier, um zum Raum zu gelangen"
                              classes="link-inline expand-grid-line"
                              newTab={true}
                              href="https://google.de">www.google.de
                        </Link>
                        <div class="grid-line expand-grid-line" />

                        <div class="grid-toggle-filter expand-grid-line">
                            <Toggle ariaLabel="Klicke hier, um Cam Links zu filtern"
                                    bind:toggle={displayCam}>
                                <TextLine slot="slotTrue"
                                          classes="toggle-slot toggle-slot-true">Cam
                                </TextLine>
                                <TextLine slot="slotFalse"
                                          classes="toggle-slot">Cam
                                </TextLine>
                            </Toggle>
                            <Toggle ariaLabel="Klicke hier, um Screen Links zu filtern"
                                    bind:toggle={displayScreen}>
                                <TextLine slot="slotTrue"
                                          classes="toggle-slot toggle-slot-true">Screen
                                </TextLine>
                                <TextLine slot="slotFalse"
                                          classes="toggle-slot">Screen
                                </TextLine>
                            </Toggle>
                            <Toggle ariaLabel="Klicke hier, um Push Links zu filtern"
                                    bind:toggle={displayPush}>
                                <TextLine slot="slotTrue"
                                          classes="toggle-slot toggle-slot-true">Push
                                </TextLine>
                                <TextLine slot="slotFalse"
                                          classes="toggle-slot">Push
                                </TextLine>
                            </Toggle>
                            <Toggle ariaLabel="Klicke hier, um View Links zu filtern"
                                    bind:toggle={displayView}>
                                <TextLine slot="slotTrue"
                                          classes="toggle-slot toggle-slot-true">View
                                </TextLine>
                                <TextLine slot="slotFalse"
                                          classes="toggle-slot">View
                                </TextLine>
                            </Toggle>
                        </div>

                        {#each entries as e}
                            <div class="grid-line expand-grid-line" />
                            <TextLine classes="expand-grid-line">{e.name}:</TextLine>
                            {#if displayCam && displayPush}
                                <LinkGridEntry description="Cam Push:"
                                               visible={true}
                                               link={e.push_cam} />
                            {/if}
                            {#if displayScreen && displayPush}
                                <LinkGridEntry description="Screen Push:"
                                               visible={true}
                                               link={e.push_screen} />
                            {/if}
                            {#if displayCam && displayView}
                                <LinkGridEntry description="Cam View:"
                                               visible={true}
                                               link={e.view_cam} />
                            {/if}
                            {#if displayScreen && displayView}
                                <LinkGridEntry description="Screen View:"
                                               visible={true}
                                               link={e.view_screen} />
                            {/if}
                        {/each}
                    </div>
                {/if}
            </div>
        {:else}
            <TextLine>Kein aktuelles Event</TextLine>
        {/if}
    {:else}
        <TextLine>Keine Events</TextLine>
    {/if}
</SectionDashboard>

<style>
    :global(.dashboard-admin-event-section) {
        gap: var(--full-gap);
    }

    :global(.dashboard-admin-event-form) {
        margin-top: var(--4x-margin);
    }

    .links-wrapper {
        display:        flex;
        flex-direction: column;
        padding:        var(--full-padding);
        border:         1px solid var(--primary-color-dark);
        gap:            var(--full-gap);
        align-items:    center;
    }

    .button-array {
        display:        flex;
        flex-direction: row;
        gap:            var(--full-gap);
    }

    .link-grid {
        display:               grid;
        gap:                   var(--full-gap);
        grid-template-columns: auto 1fr auto;
    }

    .grid-toggle-filter{
        display: flex;
        flex-direction: row;
        gap: var(--full-gap);
        justify-content: center;
    }

    :global(.toggle-slot) {
        padding:       var(--full-padding);
        color:         var(--text-color);
        border-radius: var(--border-radius);
    }

    :global(.toggle-slot-true) {
        background: var(--primary-color-dark);
    }

    .grid-line {
        border-top: 1px solid var(--background-color-light);
    }

    :global(.expand-grid-line) {
        grid-column: 1/4
    }
</style>
