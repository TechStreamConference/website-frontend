<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadDashboard, LoadUserApplication } from 'types/dashboardLoadTypes';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SpeakerTeamMemberEventForm from 'pages/speakerTeamMemberEventForm.svelte';
    import SpeakerTeamMemberSocialMediaLinkForm from 'pages/speakerTeamMemberSocialMediaLinkForm.svelte';
    import Button from 'elements/input/button.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import StyledLink from 'elements/input/styledLink.svelte';
    import HeadlineH2 from 'elements/text/headlineH2.svelte';

    export let data: LoadDashboard & LoadUserApplication;

    async function save(): Promise<void> {
        console.log('on submit');
    }
</script>

<Tabs
      entries={Menu.user}
      entryName={MenuItem.application.name}
      classes="navigation-tabs-dashboard-subpage"
/>

<SectionDashboard classes="standard-dashboard-section">
    {#if data.error}
        <div class="dashboard-user-application-error">
            <Paragraph classes="paragraph-pre-wrap"
                       --text-align="center">{data.error.error}</Paragraph>
            <div class="dashboard-user-application-button-wrapper">
                <StyledLink title="Klicke hier, um zur Hauptseite zurück zu kehren"
                            text="Hauptseite"
                            href="/"
                            newTab={false}
                />
                {#if data.roles.is_speaker}
                    <StyledLink title={MenuItem.speakerEvents.description}
                                text={MenuItem.speakerEvents.name}
                                href={MenuItem.speakerEvents.url}
                                newTab={false}
                    />
                    <StyledLink title={MenuItem.speakerSocialMedia.description}
                                text={MenuItem.speakerSocialMedia.name}
                                href={MenuItem.speakerSocialMedia.url}
                                newTab={false}
                    />
                {/if}
            </div>
        </div>
    {:else if data.data}
        <form class="dashboard-user-application-form"
              on:submit|preventDefault={save}>
            <div class="dashboard-user-application-section">
                <HeadlineH2>Event-Daten</HeadlineH2>
                <SpeakerTeamMemberEventForm bind:data={data.data.speaker}
                                            displaySaveButton={false} />
            </div>
            <div class="dashboard-user-application-section">
                <HeadlineH2>Social Media-Daten</HeadlineH2>
                <SpeakerTeamMemberSocialMediaLinkForm bind:data={data.data.socials}
                                                      bind:roles={data.roles}
                                                      displaySaveButton={false} />
            </div>
            <div class="dashboard-user-application-button-wrapper">
                <Button type="submit"
                        ariaLabel="Klicke hier, um dich zu bewerben">Bewerben
                </Button>
            </div>
        </form>
    {/if}
</SectionDashboard>


<style>
    .dashboard-user-application-error {
        display:        flex;
        flex-direction: column;
        gap:            var(--4x-gap);
        margin-top:     var(--8x-margin);
    }

    .dashboard-user-application-form {
        margin-top:     var(--8x-margin);
        display:        flex;
        flex-direction: column;
        gap:            var(--8x-gap);
    }

    .dashboard-user-application-section {
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
        border:         1px solid var(--primary-color-dark);
        padding:        var(--full-padding);
        border-radius:  var(--border-radius);

    }

    .dashboard-user-application-button-wrapper {
        display:         flex;
        flex-direction:  row;
        justify-content: center;
        gap:             var(--2x-gap);
    }
</style>
