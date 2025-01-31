<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadAdminApprovalSpeakerTeamMember } from 'types/dashboardLoadTypes';

    import { getElementByUserIdSafe } from 'helper/basic';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import AdminSpeakerTeamMemberApprovalFormWrapper from 'forms/adminSpeakerTeamMemberApprovalFormWrapper.svelte';
    import AdminSocialMediaApprovalFormWrapper from 'forms/adminSocialMediaApprovalFormWrapper.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';

    export let data: LoadAdminApprovalSpeakerTeamMember;

    function collectElementMediaByUserId<T extends {
        user_id: number
    }>(elements: T[], userID: number): T[] {
        const toReturn: T[] = [];
        for (const element of elements) {
            if (element.user_id === userID) {
                toReturn.push(element);
            }
        }
        return toReturn;
    }

    function getNameByUserID(userID: number): string {
        const speaker = getElementByUserIdSafe(data.speaker, userID);
        if (speaker) {
            return speaker.account.username;
        }

        const teamMember = getElementByUserIdSafe(data.teamMember, userID);
        if (teamMember) {
            return teamMember.account.username;
        }

        const media = getElementByUserIdSafe(data.socialMedia, userID);
        if (media) {
            return media.account.username;
        }

        console.error(`not able to look up username by user ID: ${userID}`);
        throw (404);
    }
</script>

<Tabs
      entries={Menu.admin}
      entryName={MenuItem.adminApprovalSpeakerTeamMember.name}
      classes="navigation-tabs-dashboard-subpage"
/>

<SectionDashboard classes="standard-dashboard-section">
    {#each data.userIDArray as userID}
        <div class="dashboard-admin-user-wrapper">
            <SubHeadline classes="sub-headline-center">{getNameByUserID(userID)}</SubHeadline>
            <AdminSpeakerTeamMemberApprovalFormWrapper type="speaker"
                                                       speakerTeamMember={collectElementMediaByUserId(data.speaker, userID)} />
            <AdminSpeakerTeamMemberApprovalFormWrapper type="team-member"
                                                       speakerTeamMember={collectElementMediaByUserId(data.teamMember, userID)} />
            <AdminSocialMediaApprovalFormWrapper media={collectElementMediaByUserId(data.socialMedia, userID)} />
        </div>
    {/each}
</SectionDashboard>

<style>

    .dashboard-admin-user-wrapper {
        display:        flex;
        flex-direction: column;
        border:         1px solid var(--primary-color-light);
        border-radius:  var(--border-radius);
        padding:        var(--full-padding);
        gap:            var(--full-gap);
    }

</style>
