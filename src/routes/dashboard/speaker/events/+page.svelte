<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/dashboardItems';

    import type { LoadDashboard, LoadSpeakerTeamMemberEvent } from 'types/dashboardLoadTypes';

    import SpeakerTeamMemberEvent from 'pages/speakerTeamMemberEvent.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import VdoGrid from 'elements/vdo/vdo-grid.svelte';
    import Button from 'elements/input/button.svelte';
    import GeneralPopup from 'elements/popups/generalPopup.svelte';

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
    ];

    export let data: LoadDashboard & LoadSpeakerTeamMemberEvent;

    const containsLinks: boolean = true;
    let displayLinks: boolean    = false;

    let showLinkPopup: GeneralPopup;

    async function showLinksAsync(): Promise<void> {
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

{#if containsLinks}
    <div class="link-wrapper">
        <SubHeadline>Video Links des aktuellen Events:</SubHeadline>
        {#if displayLinks}
            <VdoGrid {entries} />
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
