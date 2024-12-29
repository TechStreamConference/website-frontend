<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SpeakerTeamMemberEventForm from 'pages/speakerTeamMemberEventForm.svelte';
    import SpeakerTeamMemberSocialMediaLinkForm from 'pages/speakerTeamMemberSocialMediaLinkForm.svelte';
    import Button from 'elements/input/button.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';

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
    <form class="dashboard-user-application-form"
          on:submit|preventDefault={save}>
        <SpeakerTeamMemberEventForm displaySaveButton={false} />
        <SpeakerTeamMemberSocialMediaLinkForm showSaveButton={false} />
        <Button type="submit"
                ariaLabel="Klicke hier, um dich zu bewerben">Bewerben
        </Button>
    </form>
</SectionDashboard>


<style>
    .dashboard-user-application-form {
        display:         flex;
        flex-direction:  column;
    }
</style>
