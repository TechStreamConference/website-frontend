<script lang="ts">
    export let submitCallback: () => void;
    export let classes: string  = '';
    export let useForm: boolean = true;
</script>

{#if useForm}
    <form class={classes}
          on:submit|preventDefault={submitCallback}>
        <slot />
    </form>
{:else}
    <slot />
{/if}
