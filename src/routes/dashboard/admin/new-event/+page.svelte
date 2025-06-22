<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/dashboardItems';

    import { type DashboardEvent } from 'types/dashboardProvideTypes';

    import { formatDate } from 'helper/dates';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import AdminEventForm from 'forms/adminEventForm.svelte';
    import TextLine from 'elements/text/textLine.svelte';

    enum State {
        Default,
        Saved,
    }

    let currentState: State = State.Default;

    let event: DashboardEvent = {
        id:                    0,
        title:                 '',
        subtitle:              '',
        start_date:            formatDate(String(new Date()), '%YYYY-%MM-%DD'),
        end_date:              formatDate(String(new Date()), '%YYYY-%MM-%DD'),
        discord_url:           '',
        twitch_url:            '',
        presskit_url:          '',
        trailer_url:           '',
        trailer_poster_url:    '',
        description_headline:  '',
        description:           '',
        schedule_visible_from: formatDate(String(new Date()), '%YYYY-%MM-%DDT%hh:00:00'),
        publish_date:          formatDate(String(new Date()), '%YYYY-%MM-%DDT%hh:00:00'),
        call_for_papers_start: formatDate(String(new Date()), '%YYYY-%MM-%DDT%hh:00:00'),
        call_for_papers_end:   formatDate(String(new Date()), '%YYYY-%MM-%DDT%hh:00:00'),
        frontpage_date:        formatDate(String(new Date()), '%YYYY-%MM-%DDT%hh:00:00'),
    };

</script>

<Tabs classes="subpage-navigation-tabs"
      position="center"
      entries={Menu.admin}
      entryName={MenuItem.adminNewEvent.name} />

<SectionDashboard classes="standard-dashboard-section">
    {#if currentState === State.Saved}
        <div class="dashboard-admin-new-event-message-wrapper">
            <TextLine>Das Event '{event.title}' wurde erfolgreich angelegt.</TextLine>
            <TextLine>Du kannst es ab jetzt im Event Tab bearbeiten.</TextLine>
        </div>
    {:else}
        <AdminEventForm {event}
                        speakerArray={undefined}
                        on:save={() => currentState = State.Saved} />
    {/if}
</SectionDashboard>

<style>
    .dashboard-admin-new-event-message-wrapper {
        display:        flex;
        flex-direction: column;
        align-items:    center;
        margin-top:     var(--4x-margin);
        gap:            var(--full-gap);
    }
</style>
