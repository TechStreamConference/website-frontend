<script lang="ts">

    import type { DashboardApprovalSpeakerTeamMember } from 'types/dashboardProvideTypes';

    import SubHeadline from 'elements/text/subHeadline.svelte';

    export let speakerTeamMember: DashboardApprovalSpeakerTeamMember | undefined;
    export let type: 'speaker' | 'team-member';
</script>

{#if speakerTeamMember}
    <SubHeadline classes="sub-headline-center"
                 size="sub-headline-small">{type === 'speaker' ? 'Speaker' : 'Team Member'}</SubHeadline>
{/if}

<style>

</style>
