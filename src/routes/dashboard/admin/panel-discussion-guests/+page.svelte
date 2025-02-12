<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import Tabs from 'elements/navigation/tabs.svelte';

    export let data: void;
</script>

<Tabs
      entries={Menu.admin}
      entryName={MenuItem.adminPanelDiscussionGuests.name}
      classes="navigation-tabs-dashboard-subpage"
/>

<style>

</style>
