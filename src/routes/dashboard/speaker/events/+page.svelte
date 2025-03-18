<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/dashboardItems';

    import type { LoadDashboard, LoadSpeakerTeamMemberEvent } from 'types/dashboardLoadTypes';
    import type { DashboardAdminVdoLink } from 'types/dashboardProvideTypes';

    import { apiUrl } from 'helper/links';
    import { checkAndParseInputDataAsync } from 'helper/parseJson';
    import { z } from 'zod';

    import SpeakerTeamMemberEvent from 'pages/speakerTeamMemberEvent.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import VdoGrid from 'elements/vdo/vdo-grid.svelte';
    import Button from 'elements/input/button.svelte';
    import GeneralPopup from 'elements/popups/generalPopup.svelte';

    let vdoData: DashboardAdminVdoLink | undefined = undefined;

    export let data: LoadDashboard & LoadSpeakerTeamMemberEvent;

    let displayLinks: boolean = false;

    let showLinkPopup: GeneralPopup;

    async function showLinksAsync(): Promise<void> {
        const fetchPromise = fetch(apiUrl('/dashboard/speaker/video-room'));
        const parsePromise = checkAndParseInputDataAsync(
            await fetchPromise,
            z.object({
                         push_cam: z.string(),
                         push_screen: z.string(),
                     }),
            `Serveranfrage für Video Links nicht erfolgreich.`,
            `Unerwartete Daten für Video Links.`,
        );

        const links = await parsePromise;

        vdoData      = {
            director: '',
            speakers: [
                {
                    name:        data.roles.username,
                    view_cam:    '',
                    view_screen: '',
                    push_screen: links.push_screen,
                    push_cam:    links.push_cam,
                },
            ],
        };
        displayLinks = true;
    }
</script>

<GeneralPopup bind:this={showLinkPopup}
              headline="Links anzeigen?"
              text="Hinweis: Die links enthalten sensible Daten wie Passwörter."
              acceptButtonText="Ja"
              denyButtonText="Nein"
              acceptCallback={showLinksAsync}
              denyCallback={() => {}} />

{#if data.containsCurrentVideoLinks}
    <div class="link-wrapper">
        <SubHeadline>Video Links des aktuellen Events:</SubHeadline>
        {#if displayLinks}
            <VdoGrid entries={vdoData} />
        {:else}
            <Button ariaLabel="Klicke hier, um deine aktuellen Video Links anzuzeigen"
                    on:click={ () => {showLinkPopup.show(""); }}>Links anzeigen
            </Button>
        {/if}
    </div>
{/if}
<SpeakerTeamMemberEvent
      {data}
      menu={Menu.speaker}
      menuItem={MenuItem.speakerEvents}
      type="speaker"
      explanation="Hier kannst du bearbeiten, wie du auf der Startseite angezeigt werden möchtest, sobald dein Speaker-Profil öffentlich sichtbar geschaltet wurde. Jede Änderung, die du hier vornimmst, muss zunächst von den Admins freigegeben werden. Deine Daten können sich von Event zu Event unterscheiden. Wähle dazu im Dropdown-Menü das Event, für das du deine Daten bearbeiten möchtest."
/>

<style>
    .link-wrapper {
        display:        flex;
        flex-direction: column;
        border:         1px solid var(--secondary-color);
        border-radius:  var(--border-radius);
        padding:        var(--full-padding);
        width:          100rem;
        margin:         var(--full-margin) auto;
        align-items:    center;
        gap:            var(--full-gap);
    }
</style>
