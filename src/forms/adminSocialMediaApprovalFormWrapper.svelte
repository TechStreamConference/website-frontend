<script lang="ts">

    import type { DashboardAllApprovalSocialMediaLinks } from 'types/dashboardProvideTypes';

    import { createEventDispatcher } from 'svelte';

    import AdminSocialMediaApprovalForm from './adminSocialMediaApprovalForm.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';

    const dispatch = createEventDispatcher();


    export let media: DashboardAllApprovalSocialMediaLinks;
</script>

{#if media.length > 0}
    <SubHeadline classes="sub-headline-center"
                 size="sub-headline-small">Social Media Link
    </SubHeadline>
    {#each media as link}
        <AdminSocialMediaApprovalForm media={link}
                                      on:changes={() => {dispatch('changes', link.id)}}
                                      on:approved={() => {dispatch('approved', link.id)}} />
    {/each}
{/if}
