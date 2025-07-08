<script lang="ts">
    import type {CropperProps} from "types/cropperTypes";
    import {onMount} from "svelte";

    export let src: string;
    export let ariaLabel: string;
    export let cropperProps: CropperProps;
    export let hideOverflow: boolean = true;


    let container: HTMLElement;
    let scale: number = 1;

    $: if (cropperProps.width || cropperProps.height) {
        updateScale();
    }

    onMount(() => {
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    })

    function updateScale() {
        if (!container) {
            return;
        }
        let scale_width = container.offsetWidth / cropperProps.width;
        let scale_height = container.offsetHeight / cropperProps.height;
        scale = Math.min    (scale_width, scale_height);
    }
</script>


<div class="crop-container"
     bind:this={container}
     style="
            {hideOverflow ? 'overflow: hidden;' : ''};
        "
>
    <img
            class="crop-image"
            src={src}
            alt={ariaLabel}
            style="
                object-fit: none;
                object-position: -{cropperProps.x}px -{cropperProps.y}px;
                width: {cropperProps.width}px;
                height: {cropperProps.height}px;
                transform: scale({scale});
                transform-origin: top left;
            "
    />
</div>

<style>
    .crop-container {
        position: relative;
        border: 1px solid var(--line-color);
        border-radius: var(--border-radius);
        width: 50rem;
        height: 50rem;
    }

    .crop-image {
        position: absolute;
        left: 0;
        top: 0;
    }
</style>
