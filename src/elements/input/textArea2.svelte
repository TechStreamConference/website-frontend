<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {lerpTextCountColor} from "helper/color";
    import {onMount} from "svelte";

    import Label from "elements/text/label.svelte";
    import TextLine from "elements/text/textLine.svelte";

    export let ariaLabel: string;
    export let classes: string = "";
    export let id: string;
    export let value: string;
    export let limit: number;
    export let rows: number = 10;
    export let labelText: string;
    export let placeholder: string = " ";

    export const NO_LIMIT = -1;
    let colorString: string;

    const dispatch = createEventDispatcher();

    $: if (placeholder.trim().length == 0) {
        placeholder = " ";
    }

    onMount(() => {
        calcColor();
    })

    function handleKeydown(event: KeyboardEvent) {
        if (event.ctrlKey && event.key === 'Enter') {
            dispatch('submit');
        }
    }

    function calcColor(): void {
        if (limit === NO_LIMIT) {
            return;
        }

        const color = lerpTextCountColor(value.length, limit);
        colorString = `rgb(${color.red},${color.green}, ${color.blue})`;
    }

</script>

<div class="text-area-wrapper {classes}">
    <textarea
            maxlength={limit}
            class="normal-font"
            {id}
            name={id}
            bind:value
            placeholder={placeholder}
            on:input={ () => { calcColor(); dispatch('input'); } }
            aria-label={ariaLabel}
            {rows}
            on:keydown={handleKeydown}
    ></textarea>

    <Label classes="floating-text-area-label" for_={id}>{labelText}</Label>

    {#if limit !== NO_LIMIT}
        <TextLine classes="text-color-custom input-limit-text-area"
                  --color="{colorString}"
        >{value.length} / {limit}</TextLine>
    {/if}
</div>

<style>
    .text-area-wrapper {
        width: 100%;
        height: fit-content;
        position: relative;
        margin-top: var(--full-margin);
    }

    textarea {
        width: 100%;
        height: 100%;
        color: var(--text-color);
        background-color: transparent;
        border: 1px solid var(--line-color);
        border-radius: var(--border-radius);
        padding: var(--half-padding);
        overflow: auto;
        resize: vertical;
        font-size: var(--full-font-size);
        transition: border-radius var(--transition-duration);
        scrollbar-gutter: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--line-color) var(--background-color-light);
    }

    textarea:hover {
        border-radius: 0;
        transition: border-radius var(--transition-duration);
    }

    :global(.input-limit-text-area) {
        position: absolute;
        top: -1.5rem;
        right: 2rem;
        font-size: var(--half-font-size) !important;
        background-color: var(--background-color);
        padding: 0 var(--full-padding);
        transition: top var(--transition-duration),
        left var(--transition-duration),
        font-size var(--transition-duration);
        pointer-events: none;
    }

    :global(.floating-text-area-label) {
        position: absolute;
        left: 1rem;
        top: 1rem;
        font-size: var(--full-font-size);
        background-color: var(--background-color);
        padding: 0 var(--half-padding);
        border-radius: var(--border-radius);
        transition: top var(--transition-duration),
        left var(--transition-duration),
        font-size var(--transition-duration);
    }

    textarea:focus ~ :global(.floating-text-area-label),
    textarea:not(:placeholder-shown) ~ :global(.floating-text-area-label),
    textarea:hover ~ :global(.floating-text-area-label) {
        top: -1.5rem;
        left: 0.5rem;
        font-size: var(--half-font-size);
    }
</style>
