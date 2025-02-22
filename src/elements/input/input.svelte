<script lang="ts">
    import type { Color } from 'helper/basic';

    import { typeWorkaround } from 'types/workaround';
    import { lerpColor, orange } from 'helper/basic';
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    import Label from 'elements/text/label.svelte';
    import TextLine from 'elements/text/textLine.svelte';

    export let ariaLabel: string;

    export let classes: string         = '';
    export let type: string            = '';
    export let id: string              = '';
    export let labelText: string       = '';
    export let placeholderText: string = '';
    export let fileAccept: string      = '';
    export let limit: number           = -1;

    export let value: string | number | File = '';
    let colorString: string                  = '';

    let input: HTMLInputElement;
    const dispatch = createEventDispatcher();

    onMount(() => {
        calcColor();
    });

    export function clear(): void {
        input.value = '';
    }

    function calcColor(): void {
        if (limit === -1) {
            return;
        }
        if (typeof value !== 'string' && typeof value !== 'number') {
            return;
        }

        const length = typeof value === 'string' ? value.length : value.toString().length;
        let factor   = 1 - (length / limit);
        if (factor > 0.5) {
            factor = 1;
        } else {
            factor *= 2;
        }

        const color: Color = lerpColor(orange, {
            red:   255,
            green: 255,
            blue:  255,
        }, factor);
        colorString        = `rgb(${color.red},${color.green}, ${color.blue})`;
    }
</script>

<div class="{classes} input-line-wrapper">
    <div class="input-line-label-wrapper">
        <Label for_={id}>{labelText}</Label>
        {#if limit !== -1}
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
        display:        flex;
        flex-direction: column;
        width:          100%;
    }

    .input-line-label-wrapper {
        display:         flex;
        flex-direction:  row;
        justify-content: space-between;
    }

    .input-line {
        color:            var(--white-color);
        background-color: var(--primary-color-light);
        border-radius:    var(--border-radius);
        border:           none;
        padding:          var(--half-padding);
        width:            100%;
        font-size:        var(--full-font-size);
    }
</style>
