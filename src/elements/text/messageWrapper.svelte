<script lang="ts">
    import Message from './message.svelte';

    export let messages: string[];
</script>

{#if messages.length > 0}
    {#each messages as message}
        <Message {message}
                 classes="message-pre-wrap" />
    {/each}
{/if}
