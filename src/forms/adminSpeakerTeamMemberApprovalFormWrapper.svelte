<script lang="ts">

    import type { DashboardAllApprovalSpeakerTeamMembers } from 'types/dashboardProvideTypes';

import AdminSpeakerTeamMemberApprovalForm from './adminSpeakerTeamMemberApprovalForm.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';

    export let speakerTeamMember: DashboardAllApprovalSpeakerTeamMembers;
    export let type : 'speaker' | 'team-member'
</script>

{#if speakerTeamMember.length > 0}
    <SubHeadline classes="sub-headline-center"
                 size="sub-headline-small">{type === 'speaker' ? 'Speaker' : 'Team Member'}</SubHeadline>
    <div class="admin-approval-speaker-team-member-entry-wrapper">
    {#each speakerTeamMember as link}
        <AdminSpeakerTeamMemberApprovalForm {type} speakerTeamMember= {link} />
    {/each}
    </div>
{/if}

<style>
    .admin-approval-speaker-team-member-entry-wrapper{
        display: flex;
        flex-direction: column;
        gap: var(--full-gap);
    }
</style>
