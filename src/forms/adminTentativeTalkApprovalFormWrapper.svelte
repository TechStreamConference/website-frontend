<script lang="ts">
    import type { DashboardAllTentativeOrAcceptedTalks, DashboardAllTimeSlots } from 'types/dashboardProvideTypes';
    import AdminTentativeTalkApprovalForm from './adminTentativeTalkApprovalForm.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import { createEventDispatcher } from 'svelte';

    export let talks: DashboardAllTentativeOrAcceptedTalks;
    export let slots: {
        [key: number]: DashboardAllTimeSlots
    };
    const dispatch = createEventDispatcher();
</script>

{#if talks.length > 0}
    <div class="dashboard-admin-tentative-talk-approval-wrapper">
        <SubHeadline classes="sub-headline-center"
                     size="sub-headline-small">Vorläufig:
        </SubHeadline>
        {#each talks as talk}
            <AdminTentativeTalkApprovalForm {talk}
                                            {slots}
                                            on:reject={()=> dispatch('reject', talk.id)}
                                            on:suggest={()=> dispatch('suggest', talk.id)} />
        {/each}
    </div>
{/if}


<style>
    .dashboard-admin-tentative-talk-approval-wrapper {
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
    }
</style>
