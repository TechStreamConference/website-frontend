<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/dashboardItems';

    import type { LoadSpeakerApplication } from 'types/dashboardLoadTypes';
    import type { DashboardPendingTalk } from 'types/dashboardProvideTypes';

    import { formatDate } from 'helper/dates.js';

    import Tabs from 'elements/navigation/tabs.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import SpeakerTalkForm from 'forms/speakerTalkForm.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import Explanation from 'elements/text/explanation.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';

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
        speaker:            {
            id:                0,
            name:              '',
            user_id:           0,
            requested_changes: '',
            bio:               '',
            photo:             '',
            is_approved:       false,
            visible_from:      null,
            short_bio:         '',
        },
        requested_changes:  '',
    };
</script>

<Tabs entries={Menu.speaker}
      entryName={MenuItem.speakerApplication.name}
      classes="navigation-tabs-dashboard-subpage" />

<SectionDashboard classes="standard-dashboard-section">
    <Explanation>
        Hier kannst du ein Thema für einen Vortrag einreichen, den du gerne bei unserem Event halten möchtest. Trage
        dafür deine Daten unten ein. Wenn du deinen Vortrag eingereicht hast, wird er von uns geprüft und wir werden uns
        per E-Mail bei dir melden.
    </Explanation>
    {#if saved}
        <div class="dashboard-speaker-application-success-wrapper">
            <TextLine>Dein Talk wurde erfolgreich eingereicht.</TextLine>
            <TextLine>Du bekommst jetzt eine E-Mail.</TextLine>
            <TextLine>Sobald wir deinen Talk bearbeitet haben, werden wir dich benachrichtigen.</TextLine>
            <TextLine>Du möchtest deinen Talk noch bearbeiten? Kein Problem. Er wird bereits im Talk-Tab angezeigt.
            </TextLine>
        </div>
    {:else}
        {#if data.canApply && data.event}
            <div class="current-event-wrapper">
                <SubHeadline>Aktuelles Event:</SubHeadline>
                <TextLine>{data.event.title}</TextLine>
                <TextLine>{formatDate(data.event.start_date, '%DD.%MM.')} - {formatDate(data.event.end_date,
                                                                                        '%DD.%MM.%YYYY'
                )}</TextLine>
            </div>
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

    .current-event-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: var(--full-margin) 0;
    }
</style>
