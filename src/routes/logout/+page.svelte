<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    import { trySaveDashboardDataAsync } from 'helper/trySaveDashboardData';

    import TextLine from 'elements/text/textLine.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';

    let errorQueue: string[] = [];

    async function logoutAsync(): Promise<void> {
        const result = await trySaveDashboardDataAsync([], '/api/account/logout', 'POST');
        if (!result.success) {
            return;
        }
        await goto('/');
    }

    onMount(async () => {
        await logoutAsync();
    });
</script>

<TextLine>Logging out...</TextLine>
<MessageWrapper messages={errorQueue} />
