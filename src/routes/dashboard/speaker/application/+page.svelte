<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadSpeakerApplication } from 'types/dashboardLoadTypes';
    import type { DashboardPendingTalk } from 'types/dashboardProvideTypes';

    import Tabs from 'elements/navigation/tabs.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import SpeakerTalkForm from 'pages/speakerTalkForm.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import StyledLink from 'elements/input/styledLink.svelte';

    export let data: LoadSpeakerApplication;
    let saved: boolean = false;


    let entry: DashboardPendingTalk = {
        id:                 0,
        event_id:           data.event ? data.event.id : 0,
        title:              '',
        description:        '',
        tags:               [],
        possible_durations: [],
        notes:              '',
        requested_changes:  '',

    };
</script>

<Tabs entries={Menu.speaker}
      entryName={MenuItem.speakerApplication.name}
      classes="navigation-tabs-dashboard-subpage" />

<SectionDashboard classes="standard-dashboard-section">
    {#if saved}
        <div class="dashboard-speaker-application-success-wrapper">
            <TextLine>Dein Talk wurde erfolgreich eingereicht.</TextLine>
            <TextLine>Du bekommst jetzt eine E-Mail.</TextLine>
            <TextLine>Sobald wir deinen Talk bearbeitet haben, werden wir dich benachrichtigen.</TextLine>
            <TextLine>Du möchtest deinen Talk noch bearbeiten? Kein Problem. Er wird bereits im Talk-Tab angezeigt.
            </TextLine>
            <StyledLink text={MenuItem.speakerTalk.name}
                        href={MenuItem.speakerTalk.url}
                        title={MenuItem.speakerTalk.description}
                        newTab={false} />
        </div>
    {:else}
        {#if data.canApply && data.event}
            <TextLine classes="text-line-center">Aktuelles Event: {data.event.title}</TextLine>
            <SpeakerTalkForm data={entry}
                             tags={data.tags}
                             talkDurations={data.talkDurations}
                             on:save={() => saved = true} />
        {:else}
            <TextLine>Aktuell kannst du keinen Talk einreichen.</TextLine>
            <TextLine>Versuche es gerne bei der nächsten Bewerbungsphase wieder.</TextLine>
        {/if}
    {/if}
</SectionDashboard>

<style>
    .dashboard-speaker-application-success-wrapper {
        display:         flex;
        flex-direction:  column;
        justify-content: center;
        align-items:     center;
        gap:             var(--full-gap);
        margin-top:      var(--2x-margin);
    }
</style>
