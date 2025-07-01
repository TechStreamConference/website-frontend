<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/pageItems';

    import type { LoadDashboard } from 'types/dashboardLoadTypes';

    import Tabs from 'elements/navigation/tabs.svelte';
    import HeadlineInfoDashboard from 'elements/text/headlineInfoDashboard.svelte';

    export let data: LoadDashboard;
</script>

<Tabs position="end"
      color="purple"
      entries={Menu.getSectionLoggedIn(data.roles)}
      entryName={MenuItem.teamMember.name} />
<HeadlineInfoDashboard headline="Team Member">
    In diesem Bereich kannst du einstellen, wie du auf der Startseite angezeigt werden möchtest. Du tauchst dort als
    Team-Mitglied auf. Editiere deine Daten unter „Events”. Deine Social-Media-Verlinkungen kannst du unter „Social
    Media” bearbeiten.
</HeadlineInfoDashboard>
<slot />
