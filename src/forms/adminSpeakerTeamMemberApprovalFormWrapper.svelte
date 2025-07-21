<script lang="ts">

    import type {DashboardAllApprovalSpeakerTeamMembers} from 'types/dashboardProvideTypes';

    import {createEventDispatcher} from 'svelte';

    import AdminSpeakerTeamMemberApprovalForm from './adminSpeakerTeamMemberApprovalForm.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';

    export let speakerTeamMember: DashboardAllApprovalSpeakerTeamMembers;
    export let type: 'speaker' | 'team-member';

    const dispatch = createEventDispatcher();
</script>

{#if speakerTeamMember.length > 0}
    <SubHeadline classes="sub-headline-center"
                 size="sub-headline-small">{type === 'speaker' ? 'Speaker' : 'Team Member'}</SubHeadline>
    <div class="admin-approval-speaker-team-member-entry-wrapper">
        {#each speakerTeamMember as link}
            <AdminSpeakerTeamMemberApprovalForm {type}
                                                speakerTeamMember={link}
                                                on:approve={() => dispatch('approve', link.id)}
                                                on:changes={() => dispatch('changes', link.id)}
                                                on:reject={() => dispatch('reject', { id: link.id, user_id: link.user_id })}
            />
        {/each}
    </div>
{/if}

<style>
    .admin-approval-speaker-team-member-entry-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--full-gap);
    }
</style>
