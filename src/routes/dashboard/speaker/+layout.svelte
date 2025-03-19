<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/pageItems';

    import type { LoadDashboard, LoadDashboardSpeaker } from 'types/dashboardLoadTypes';
    import type { DashboardAdminVdoLink } from 'types/dashboardProvideTypes';

    import { apiUrl } from 'helper/links';
    import { checkAndParseInputDataAsync } from 'helper/parseJson';
    import { z } from 'zod';

    import HeadlineInfoDashboard from 'elements/text/headlineInfoDashboard.svelte';
    import Tabs from 'elements/navigation/tabs.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import Button from 'elements/input/button.svelte';
    import VdoGrid from 'elements/vdo/vdo-grid.svelte';
    import GeneralPopup from 'elements/popups/generalPopup.svelte';

    export let data: LoadDashboard & LoadDashboardSpeaker;

    let vdoData: DashboardAdminVdoLink | undefined = undefined;

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

<Tabs
      entries={Menu.SectionIn(data.roles)}
      entryName={MenuItem.speaker.name}
      alignment="navigation-tabs-end"
      background="navigation-tabs-purple"
/>
<HeadlineInfoDashboard headline="Speaker">
    Unter „Events” kannst du bestimmen, wie du auf unserer Startseite angezeigt werden möchtest. Möchtest du einen neuen
    Vortrag einreichen, klicke auf „Talk einreichen”. Deine bereits eingereichten Vorträge kannst du unter „Meine Talks”
    verwalten. Im Bereich „Social Media” kannst du Links zu deinen Profilen in den sozialen Medien eintragen, die auf
    der Startseite angezeigt werden sollen.
</HeadlineInfoDashboard>

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

<slot />


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
