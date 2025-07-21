<script lang="ts">
    import Paragraph from './paragraph.svelte';

    export let ariaLabel: string = "Klicke oder Hover hier, um weitere Informationen zu erhalten.";
    export let classes: string = '';
    export let tooltipClasses: string = '';
    export let tooltip: string;

    let hovered: boolean = false;

    let x: number = 0;
    let y: number = 0;

    function enter(event: MouseEvent) {
        hovered = true;
        move(event);
    }

    function leave() {
        hovered = false;
    }

    function move(event: MouseEvent) {
        x = event.pageX;
        y = event.pageY;
    }
</script>

<button
        type="button"
        class="tooltip-button-hover {classes}"
        aria-label={ariaLabel}
        on:mouseenter={enter}
        on:mouseleave={leave}
        on:mousemove={move}
>
    <slot/>
</button>

{#if hovered}
    <div style="top: {y}px; left: {x}px;"
         class="tooltip {tooltipClasses}">
        <Paragraph classes="paragraph-pre-wrap paragraph-white"
                   --text-align="center"
        >{tooltip}</Paragraph
        >
    </div>
{/if}

<style>
    .tooltip-button-hover {
        height: auto;
        width: auto;
        background: none;
        border: none;
        border: 0;
        cursor: pointer;
    }

    .tooltip-button-hover:hover,
    .tooltip-button-hover:focus,
    .tooltip-button-hover:active {
        outline: none;
        box-shadow: none;
    }

    .tooltip {
        box-shadow: 2px 2px var(--gray-color-light);
        background: var(--primary-color-dark);
        border-radius: var(--border-radius);
        padding: var(--full-padding);
        position: absolute;
        transform: translateX(-50%) translateY(3rem); /* Center the tooltip horizontally */
    }
</style>
