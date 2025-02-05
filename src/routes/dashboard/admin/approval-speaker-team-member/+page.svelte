<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadAdminApprovalSpeakerTeamMember } from 'types/dashboardLoadTypes';

    import { getElementByUserIdSafe } from 'helper/basic';
    import { getUserIds } from './approvalHelper';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import AdminSpeakerTeamMemberApprovalFormWrapper from 'forms/adminSpeakerTeamMemberApprovalFormWrapper.svelte';
    import AdminSocialMediaApprovalFormWrapper from 'forms/adminSocialMediaApprovalFormWrapper.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';

    export let data: LoadAdminApprovalSpeakerTeamMember;

    enum DataType {
        Speaker,
        TeamMember,
        SocialMedia,
    }

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

    function deleteEntry(type: DataType, id: number): void {
        setTimeout(() => {
            switch (type) {
                case DataType.Speaker:
                    data.speaker = data.speaker.filter((speaker) => {
                        return speaker.id !== id;
                    });
                    break;
                case DataType.TeamMember:
                    data.teamMember = data.teamMember.filter((teamMember) => {
                        return teamMember.id !== id;
                    });
                    break;
                case DataType.SocialMedia:
                    data.socialMedia = data.socialMedia.filter((socialMedia) => {
                        return socialMedia.id !== id;
                    });
                    break;
            }

            data.userIDArray = getUserIds(data.speaker, data.teamMember, data.socialMedia);
        }, 3000);
    }

    function cleanUpSocialMediaLinks(user_id: number): void {
        setTimeout(() => {
            data.socialMedia = data.socialMedia.filter((socialMedia) => {
                return socialMedia.user_id !== user_id;
            });

            data.userIDArray = getUserIds(data.speaker, data.teamMember, data.socialMedia);
        }, 2900); // move this timeout a litte bit forward to make sure the social media links gets cleaned up before deletion of speaker / team member
    }
</script>

<Tabs
      entries={Menu.admin}
      entryName={MenuItem.adminApprovalSpeakerTeamMember.name}
      classes="navigation-tabs-dashboard-subpage"
/>

<SectionDashboard classes="standard-dashboard-section dashboard-admin-approval-wrapper">
    {#each data.userIDArray as userID}
        <div class="dashboard-admin-user-wrapper">
            <SubHeadline classes="sub-headline-center">{getNameByUserID(userID)}</SubHeadline>
            <AdminSpeakerTeamMemberApprovalFormWrapper type="speaker"
                                                       speakerTeamMember={collectElementMediaByUserId(data.speaker, userID)}
                                                       on:approve={(e)=>{deleteEntry(DataType.Speaker, e.detail)}}
                                                       on:reject={(e)=>{deleteEntry(DataType.Speaker, e.detail.id);
                                                           cleanUpSocialMediaLinks(e.detail.user_id);}} />
            <AdminSpeakerTeamMemberApprovalFormWrapper type="team-member"
                                                       speakerTeamMember={collectElementMediaByUserId(data.teamMember, userID)}
                                                       on:approve={(e)=>{deleteEntry(DataType.TeamMember, e.detail)}}
                                                       on:reject={(e) => {deleteEntry(DataType.TeamMember, e.detail.id);
                                                           cleanUpSocialMediaLinks(e.detail.user_id);}} />
            <AdminSocialMediaApprovalFormWrapper media={collectElementMediaByUserId(data.socialMedia, userID)}
                                                 on:approved={(e) => {deleteEntry(DataType.SocialMedia, e.detail);}} />
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

    :global(.dashboard-admin-approval-wrapper) {
        gap: var(--4x-gap) !important;
    }

</style>
