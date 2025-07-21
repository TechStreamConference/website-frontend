<script lang="ts">
    import {typeWorkaround} from 'types/workaround';
    import {lerpTextCountColor} from 'helper/color';
    import {onMount} from 'svelte';
    import {createEventDispatcher} from 'svelte';

    import Label from 'elements/text/label.svelte';
    import TextLine from 'elements/text/textLine.svelte';

    export let ariaLabel: string;

    export let classes: string = '';
    export let type: string = '';
    export let id: string = '';
    export let labelText: string = '';
    export let placeholderText: string = '';
    export let fileAccept: string = '';
    export const NO_LIMIT: number = -1;
    export let limit: number = NO_LIMIT;

    export let value: string | number | File = '';
    let colorString: string = '';

    let input: HTMLInputElement;
    const dispatch = createEventDispatcher();

    onMount(() => {
        calcColor();
    });

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
    <div class="input-line-label-wrapper">
        <Label for_={id}>{labelText}</Label>
        {#if limit !== NO_LIMIT}
            {#if typeof value === 'string'}
                <TextLine classes="text-color-custom"
                          --color={colorString}>{value.length} / {limit}</TextLine>
            {:else if typeof value === 'number'}
                <TextLine classes="text-color-custom"
                          --color={colorString}>{value.toString().length} / {limit}</TextLine>
            {/if}
        {/if}
    </div>
    {#if type === 'file'}
        <input
                bind:this={input}
                class="normal-font input-line"
                {id}
                type="file"
                accept={fileAccept}
                name={id}
                placeholder={placeholderText}
                bind:value
                on:input
                on:change
                aria-label={ariaLabel}
                step="1"
        />
    {:else}
        <input
                bind:this={input}
                class="normal-font input-line"
                {id}
                use:typeWorkaround={type}
                maxlength={limit}
                name={id}
                placeholder={placeholderText}
                bind:value
                on:input={ () => { calcColor(); dispatch('input'); } }
                on:change
                aria-label={ariaLabel}
                step="1"
        />
    {/if}
</div>

<style>
    .input-line-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .input-line-label-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .input-line {
        color: var(--white-color);
        background-color: var(--primary-color-light);
        border-radius: var(--border-radius);
        border: none;
        padding: var(--half-padding);
        width: 100%;
        font-size: var(--full-font-size);
    }
</style>
