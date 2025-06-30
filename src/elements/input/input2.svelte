<script lang="ts">
    import Label from "elements/text/label.svelte"
    import TextLine from "elements/text/textLine.svelte"

    import {createEventDispatcher, onMount} from "svelte";
    import {typeWorkaround} from "types/workaround";
    import {lerpTextCountColor} from "helper/color";

    export let labelText = "";

    export let id;
    export let value: string | number | File = "";
    export let ariaLabel = "";
    export let classes = "";
    export let type: "string" | "number" | "file" = "string";
    export const NO_LIMIT: number = -1;
    export let limit: number = NO_LIMIT;

    export let fileAccept: string = "";


    let colorString: string;
    let input: HTMLInputElement;
    const dispatch = createEventDispatcher();

    onMount(() => {
        calcColor();
    })


    export function clear(): void {
        input.value = '';
    }

    function calcColor(): void {
        if (limit === NO_LIMIT) {
            return;
        }
        if (typeof value !== 'string' && typeof value !== 'number') {
            return;
        }

        const length = typeof value === 'string' ? value.length : value.toString().length;
        const color = lerpTextCountColor(length, limit);
        colorString = `rgb(${color.red},${color.green}, ${color.blue})`;
    }

</script>

<div class="{classes} input-line-wrapper">
    {#if type === "file"}
        <input
                bind:this={input}
                class="normal-font"
                {id}
                type="file"
                accept={fileAccept}
                name={id}
                bind:value
                placeholder=" "
                on:input
                on:change
                aria-label={ariaLabel}
                step="1"
        />
    {:else}
        <input
                bind:this={input}
                class="normal-font"
                {id}
                use:typeWorkaround={type}
                maxlength={limit}
                bind:value
                placeholder=" "
                on:input={() => {calcColor(); dispatch("input");}}
                on:change
                aria-label={ariaLabel}
                step="1"
        />
    {/if}
    <Label for_="{id}" classes="input-floating-label">{labelText}</Label>
    {#if limit !== NO_LIMIT}
        {#if typeof value === "string"}
            <TextLine
                    classes="text-color-custom input-limit-text-line"
                    --color="{colorString}"
            >{value.length} / {limit}</TextLine>
        {:else if typeof value === "number"}
            <TextLine
                    classes="text-color-custom input-limit-text-line"
                    --color="{colorString}"
            >{value.toString().length} / {limit}</TextLine>
        {/if}

    {/if}
</div>

<style>
    .input-line-wrapper {
        width: 100%;
        height: fit-content;
        position: relative;
        margin-top: var(--full-margin);
    }

    input {
        background-color: transparent;
        padding: var(--half-padding);
        width: 100%;
        font-size: var(--full-font-size);
        border-radius: var(--border-radius);
        border: 1px solid var(--line-color);
        transition: border-radius var(--transition-duration);
    }

    input:hover {
        border-radius: 0;
        transition: border-radius var(--transition-duration);
    }


    :global(.input-limit-text-line) {
        position: absolute;
        top: -1.5rem;
        right: 1rem;
        font-size: var(--half-font-size) !important;
        background-color: var(--background-color);
        padding: 0 var(--full-padding);
        transition: top var(--transition-duration),
        left var(--transition-duration),
        font-size var(--transition-duration);
        pointer-events: none;
    }

    :global(.input-floating-label) {
        position: absolute;
        left: var(--half-padding);
        top: 50%;
        transform: translateY(-50%);
        font-size: var(--full-font-size);
        background-color: var(--background-color);
        padding: 0 var(--half-padding);
        border-radius: var(--border-radius);
        transition: top var(--transition-duration),
        left var(--transition-duration),
        font-size var(--transition-duration);
    }

    input:focus ~ :global(.input-floating-label),
    input:not(:placeholder-shown) ~ :global(.input-floating-label),
    input:hover ~ :global(.input-floating-label) {
        top: -0.7rem;
        left: 0.5rem;
        font-size: var(--half-font-size);
    }
</style>
