<script lang="ts">

    import type { DashboardApprovalSocialMediaLink } from 'types/dashboardProvideTypes';
    import TextLine from 'elements/text/textLine.svelte';

    export let media: DashboardApprovalSocialMediaLink;
</script>

<TextLine>Link: {media.name}</TextLine>
