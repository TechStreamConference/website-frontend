<script lang="ts">
    import type { Color } from 'helper/basic';

    import { lerpColor, orange } from 'helper/basic';
    import { createEventDispatcher, onMount } from 'svelte';

    import Label from 'elements/text/label.svelte';
    import TextLine from 'elements/text/textLine.svelte';

    export let ariaLabel: string;
    export let id: string;
    export let labelText: string;

    export let classes: string         = '';
    export let placeholderText: string = '';
    export let rows: number            = 10;
    export const NO_LIMIT:number = -1;
    export let limit: number           = NO_LIMIT;

    export let value: string = '';
    let colorString: string  = '';

    const dispatch = createEventDispatcher();

    onMount(() => {
        calcColor();
    });

    function handleKeydown(event: KeyboardEvent) {
        if (event.ctrlKey && event.key === 'Enter') {
            dispatch('submit');
        }
    }


    function calcColor(): void {
        if (limit === NO_LIMIT) {
            return;
        }

        let factor = 1 - (value.length / limit);
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

<div class="{classes}">
    <Label for_={id}>{labelText}</Label>
    {#if limit !== NO_LIMIT}
        <TextLine classes="text-area-limit-text text-color-custom"
                  --color={colorString}>{value.length}
            / {limit}</TextLine>
    {/if}
    <textarea
          maxlength={limit}
          class="normal-font"
          {id}
          name={id}
          placeholder={placeholderText}
          bind:value
          on:input={ () => { calcColor(); dispatch('input'); } }
          aria-label={ariaLabel}
          {rows}
          on:keydown={handleKeydown}
    />
</div>

<style>
    div {
        display:        flex;
        flex-direction: column;
        width:          100%;
        height:         100%;
        position:       relative;
    }

    textarea {
        color:            var(--white-color);
        background-color: var(--primary-color-light);
        border-radius:    var(--border-radius);
        border:           none;
        padding:          var(--half-padding);
        width:            100%;
        height:           100%;
        overflow:         auto;
        resize:           vertical;
        font-size:        var(--full-font-size);
    }

    :global(.text-area-limit-text) {
        position: absolute;
        right:    2rem;
        bottom:   1rem;
    }
</style>
