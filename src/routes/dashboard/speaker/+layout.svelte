<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/pageItems';

    import type { LoadDashboard } from 'types/dashboardLoadTypes';

    import HeadlineInfoDashboard from 'elements/text/headlineInfoDashboard.svelte';
    import Tabs from 'elements/navigation/tabs.svelte';

    export let data: LoadDashboard;
</script>

<Tabs
      entries={Menu.SectionIn(data.roles)}
      entryName={MenuItem.speaker.name}
      alignment="navigation-tabs-end"
      background="navigation-tabs-purple"
/>
<HeadlineInfoDashboard headline="Speaker">
    Unter „Events” kannst du bestimmen, wie du auf unserer Startseite angezeigt werden möchtest. Möchtest du einen neuen Vortrag einreichen, klicke auf „Talk einreichen”. Deine bereits eingereichten Vorträge kannst du unter „Meine Talks” verwalten. Im Bereich „Social Media” kannst du Links zu deinen Profilen in den sozialen Medien eintragen, die auf der Startseite angezeigt werden sollen.
</HeadlineInfoDashboard>

<slot />
