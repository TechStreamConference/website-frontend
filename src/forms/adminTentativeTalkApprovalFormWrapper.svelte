<script lang="ts">
    import type { DashboardAllTentativeOrAcceptedTalks } from 'types/dashboardProvideTypes';
    import AdminTentativeTalkApprovalForm from './adminTentativeTalkApprovalForm.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';

    export let talks: DashboardAllTentativeOrAcceptedTalks;
</script>

{#if talks.length > 0}
    <div class="dashboard-admin-tentative-talk-approval-wrapper">
        <SubHeadline classes="sub-headline-center" size="sub-headline-small">Vorläufig:</SubHeadline>
        {#each talks as talk}
            <AdminTentativeTalkApprovalForm {talk} />
        {/each}
    </div>
{/if}


<style>
    .dashboard-admin-tentative-talk-approval-wrapper{
        display: flex;
        flex-direction: column;
        gap: var(--full-gap);
    }
</style>
