<script lang="ts">
    import Label from "elements/text/label.svelte";
    import {createEventDispatcher} from "svelte";

    export let classes: string = "";
    export let id: string;
    export let labelText: string = "";

    export let selected: unknown;
    export let data: unknown[];

    const dispatch = createEventDispatcher();

    function handleKeydown(event: KeyboardEvent) {
        if (event.ctrlKey && event.key === "Enter") {
            dispatch("submit");
        }
    }
</script>

<div class={classes}>
    <Label classes="drop-down-floating-label" for_={id}>{labelText}</Label>
    <select class="normal-font"
            {id}
            bind:value={selected}
            on:input
            on:keydown={handleKeydown}>
        {#each data as entry}
            <option class="normal-font"
                    value={entry}>{entry}</option>
        {/each}
    </select>
</div>

<style>
    div {
        position: relative;
        width: 100%;
        margin-top: var(--2x-margin);
    }

    select {
        color: var(--text-color);
        background-color: var(--background-color);
        border-radius: var(--border-radius);
        padding: var(--half-padding);
        width: 100%;
        font-size: var(--full-font-size);
        border: 1px solid var(--line-color);
        transition: border-radius var(--transition-duration);
    }

    select:hover {
        border-radius: 0;
        transition: border-radius var(--transition-duration);
    }

    option {
        border-radius: var(--border-radius);
    }

    :global(.drop-down-floating-label) {
        position: absolute;
        top: -0.7rem;
        left: 0.5rem;
        transform: translateY(-50%);
        font-size: var(--half-font-size) !important;
        background-color: var(--background-color);
        padding: 0 var(--half-padding);
        border-radius: var(--border-radius);
    }
</style>
