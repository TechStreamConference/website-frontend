<script lang="ts">
    import type { DashboardAllPendingTalks } from 'types/dashboardProvideTypes';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import AdminPendingTalkApprovalForm from './adminPendingTalkApprovalForm.svelte';

    import { createEventDispatcher } from 'svelte';

    export let talks: DashboardAllPendingTalks;

    const dispatch = createEventDispatcher();
</script>

{#if talks.length > 0}
    <div class="dashboard-admin-pending-talk-approval-wrapper">
        <SubHeadline size="sub-headline-small"
                     classes="sub-headline-center">Ausstehend
        </SubHeadline>
        {#each talks as talk}
            <AdminPendingTalkApprovalForm {talk}
                                          on:approve={() => dispatch('approve', talk.id)}
                                          on:reject={() => dispatch('reject', talk.id)}
                                          on:changes={() => dispatch('changes', talk.id)} />
        {/each}
    </div>
{/if}

<style>
    .dashboard-admin-pending-talk-approval-wrapper {
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
    }
</style>
