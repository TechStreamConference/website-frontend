<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/dashboardItems';

    import type { LoadDashboard, LoadSpeakerTeamMemberEvent } from 'types/dashboardLoadTypes';

    import SpeakerTeamMemberEvent from 'pages/speakerTeamMemberEvent.svelte';

    export let data: LoadDashboard & LoadSpeakerTeamMemberEvent;
</script>

<SpeakerTeamMemberEvent
      {data}
      menu={Menu.speaker}
      menuItem={MenuItem.speakerEvents}
      type="speaker"
/>
