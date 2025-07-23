<script lang="ts">
    import Label from "elements/text/label.svelte";
    import {createEventDispatcher} from "svelte";

    export let classes: string = "";
    export let id: string;
    export let labelText: string = "";

    export let selected: string;
    export let data: string[];

    const dispatch = createEventDispatcher();

    function handleKeydown(event: KeyboardEvent) {
        if (event.ctrlKey && event.key === "Enter") {
            dispatch("submit");
        }
    }
</script>

<div class={classes}>
    <Label for_={id}>{labelText}</Label>
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
        display: flex;
        gap: var(--quad-gap);
        flex-direction: column;
        width: 100%;
    }

    select {
        color: var(--text-color);
        background-color: transparent;
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
        color: var(--text-color);
        background-color: var(--background-color);
        border-radius: var(--border-radius);
        border: 1px solid var(--line-color);
    }
</style>
