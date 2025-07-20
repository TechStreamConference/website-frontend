<script lang="ts">
    import Message from './message.svelte';

    export let messages: string[];
</script>

{#if messages && messages.length > 0}
    <div class="message-wrapper">
        {#each messages as message}
            <Message {message}
                     classes="message-pre-wrap"/>
        {/each}
    </div>
{/if}

<style>
    .message-wrapper {
        display: flex;
        flex-direction: column;
    }
</style>
