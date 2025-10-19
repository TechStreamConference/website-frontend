<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/dashboardItems';

    import type {LoadAdminEvents, LoadDashboard} from 'types/dashboardLoadTypes';
    import type {DashboardAdminVdoLink, DashboardAllEventSpeaker, DashboardEvent} from 'types/dashboardProvideTypes';
    import type {Writable} from "svelte/store";

    import {dashboardAdminVdoLinkScheme} from 'types/dashboardProvideTypes';
    import {onMount} from 'svelte';
    import {loadSpeaker} from './eventsHelper';
    import {convertTimeAndDateToHTML} from 'helper/dates';
    import {getElementByTitle} from 'helper/basic';
    import {apiUrl} from 'helper/links';
    import {trySaveDataAsyncOutReset} from 'helper/trySaveData.js';
    import {parseProvidedJsonAsync} from 'helper/parseJson';
    import {SaveMessageType} from 'types/saveMessageType';
    import {createPersistentStore} from "stores/persistentStore";
    import {get} from "svelte/store";

    import TextLine from 'elements/text/textLine.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import Tabs from 'elements/navigation/tabs.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import AdminEventForm from 'forms/adminEventForm.svelte';
    import Button from 'elements/input/button.svelte';
    import GeneralPopup from 'elements/popups/generalPopup.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import VdoGrid from 'elements/vdo/vdo-grid.svelte';
    import Input from 'elements/input/input.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';


    export let data: LoadDashboard & LoadAdminEvents;
    let vdoLinks: DashboardAdminVdoLink | undefined;

    let navigationDropDown: NavigationDropDown;
    let displayLinkPopup: GeneralPopup;
    let generateLinkPopup: GeneralPopup;
    let sendLinkPopup: GeneralPopup;

    let currentEvent: DashboardEvent;

    let baseUrl: string = '';

    // this is a workaround to have a persistent store but also be able to bind a variable across components
    let spareURLCountStore: Writable<number> = createPersistentStore("TEST_CONF_SPARE_VDO_COUNT", 5);
    let spareURLCount: number = get(spareURLCountStore);
    $: if (spareURLCount) {
        spareURLCount = spareURLCount < 0 ? 0 : spareURLCount;
        spareURLCountStore.set(spareURLCount);
    }

    let linkMessage: SaveMessage;
    let linkErrorQueue: string[] = [];

    onMount(() => {
        const selected = navigationDropDown.getSelected();
        if (typeof selected !== 'string') {
            console.error('selected has wrong type');
            return;
        }
        updateDisplayed(selected);
    });

    function updateDisplayed(title: string): void {
        currentEvent = getElementByTitle(data.allEvents, title);
        currentEvent.publish_date = convertTimeAndDateToHTML(currentEvent.publish_date);
        currentEvent.schedule_visible_from = convertTimeAndDateToHTML(currentEvent.schedule_visible_from);
        currentEvent.call_for_papers_start = convertTimeAndDateToHTML(currentEvent.call_for_papers_start);
        currentEvent.call_for_papers_end = convertTimeAndDateToHTML(currentEvent.call_for_papers_end);
        currentEvent.frontpage_date = convertTimeAndDateToHTML(currentEvent.frontpage_date);

        vdoLinks = undefined;

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
        const response = await fetch(apiUrl(`/dashboard/admin/video-room/event/${currentEvent.id}?num_spares=${spareURLCount}`));

        if (!response.ok) {
            linkErrorQueue = ['Keine Links für dieses Event gefunden. Sicher, dass schon welche generiert sind?'];
            return;
        }

        const data = await parseProvidedJsonAsync(response, dashboardAdminVdoLinkScheme);

        if (data === undefined) {
            linkMessage.setSaveMessage(SaveMessageType.Error);
            linkErrorQueue = ['Fehler beim Laden der Video-Links'];
        }

        vdoLinks = data;
    }

    async function genLinksAsync(): Promise<void> {
        if (baseUrl.trim().length === 0) {
            linkMessage.setSaveMessage(SaveMessageType.Error);
            linkErrorQueue = ['Keine Base URL angegeben'];
            return;
        }
        const response = await trySaveDataAsyncOutReset(
            fetch,
            {base_url: baseUrl},
            `/dashboard/admin/video-room/event/${currentEvent.id}`,
            'POST',
        );

        linkMessage.setSaveMessage(response.success ? SaveMessageType.Save : SaveMessageType.Error);
        linkErrorQueue = response.messages;
    }

    async function sendLinksAsync(): Promise<void> {
        const response = await trySaveDataAsyncOutReset(
            fetch,
            {},
            `/dashboard/admin/video-room/event/${currentEvent.id}/set-visible`,
            'POST',
        );

        linkMessage.setSaveMessage(response.success ? SaveMessageType.Save : SaveMessageType.Error);
        linkErrorQueue = response.messages;
        // number will stay undefined when no infos are provided
        const numUsers = response.infos['num_users'];
        const numAccounts = response.infos['num_accounts'];
        const numMailsSent = response.infos['num_mails_sent'];

        if (numUsers !== numAccounts) {
            linkErrorQueue.push(`Nicht für alle Speaker wurde eine Mail gefunden. | User: ${numUsers} | Accounts: ${numAccounts}`);
        }
        if (numAccounts !== numMailsSent) {
            linkErrorQueue.push(`Nicht alle Mails konnten erfolgreich verschickt werden. | Accounts: ${numAccounts} | Mails: ${numMailsSent}`);
        }
    }
</script>

<GeneralPopup bind:this={displayLinkPopup}
              headline="Links anzeigen?"
              text="Hinweis: Die Links enthalten sensible Daten wie Passwörter."
              denyButtonText="Nein"
              acceptButtonText="Ja"
              denyCallback={() => {}}
              acceptCallback={displayLinksAsync}/>
<GeneralPopup bind:this={generateLinkPopup}
              headline="Links generieren?"
              text="Hinweis: Durch das generieren neuer Links werden die alten (kommunizierten) Links ungültig."
              denyButtonText="Nein"
              acceptButtonText="Ja"
              denyCallback={() => {}}
              acceptCallback={genLinksAsync}/>
<GeneralPopup bind:this={sendLinkPopup}
              headline="Links versenden?"
              text="Hinweis: Alle Speaker werden benachrichtigt."
              denyButtonText="Nein"
              acceptButtonText="Ja"
              denyCallback={() => {}}
              acceptCallback={sendLinksAsync}/>

<Tabs classes="subpage-navigation-tabs"
      position="center"
      entries={Menu.admin}
      entryName={MenuItem.adminEvents.name}/>
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
                            event={currentEvent}/>
            <div class="links-wrapper form-border">
                <SubHeadline classes="white">Video Links</SubHeadline>
                <SaveMessage bind:this={linkMessage}/>
                <MessageWrapper messages={linkErrorQueue}/>
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
                <Input ariaLabel="Trage hier die base url zum generieren von links ein"
                       labelText="Base URL:"
                       id="dashboard-admin-input-base-url"
                       bind:value={baseUrl}></Input>
                <Input ariaLabel="Tage hier die Anzahl der Spare Links ein"
                       labelText="Anzahl Spare Links:"
                       id="dashboard-admin-input-space-url-count"
                       type="number"
                       bind:value={spareURLCount}></Input>
                <VdoGrid entries={vdoLinks}
                         displayAdmin={true}/>

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
        display: flex;
        flex-direction: column;
        gap: var(--full-gap);
        align-items: center;
    }

    .button-array {
        display: flex;
        flex-direction: row;
        gap: var(--full-gap);
    }
</style>
