<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/dashboardItems';

    import type { LoadDashboard, LoadSpeakerTeamMemberEvent } from 'types/dashboardLoadTypes';

    import SpeakerTeamMemberEvent from 'pages/speakerTeamMemberEvent.svelte';

    export let data: LoadDashboard & LoadSpeakerTeamMemberEvent;
</script>

<SpeakerTeamMemberEvent
      {data}
      menu={Menu.teamMember}
      menuItem={MenuItem.teamMemberEvents}
      type="team-member"
      explanation="Hier kannst du bearbeiten, wie du auf der Startseite angezeigt werden möchtest, sobald dein Team-Member-Profil öffentlich sichtbar geschaltet wurde. Jede Änderung, die du hier vornimmst, muss zunächst von den Admins freigegeben werden. Deine Daten können sich von Event zu Event unterscheiden. Wähle dazu im Dropdown-Menü das Event, für das du deine Daten bearbeiten möchtest."
/>
