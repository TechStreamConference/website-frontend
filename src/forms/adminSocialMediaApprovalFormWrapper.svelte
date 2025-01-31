<script lang="ts">

    import type { DashboardAllApprovalSocialMediaLinks } from 'types/dashboardProvideTypes';

    import AdminSocialMediaApprovalForm from './adminSocialMediaApprovalForm.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';

    export let media: DashboardAllApprovalSocialMediaLinks;
</script>

{#if media.length > 0}
    <SubHeadline classes="sub-headline-center"
                 size="sub-headline-small">Social Media Link
    </SubHeadline>
    {#each media as link}
        <AdminSocialMediaApprovalForm media={link} />
    {/each}
{/if}
