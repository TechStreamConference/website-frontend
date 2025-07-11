<script lang="ts">
    import type {CropperProps} from "types/cropperTypes";
    import {onMount} from 'svelte';

    export let cropperProps: CropperProps;
    export let file: Blob;
    export let ariaLabel: string;
    export let classes: string = '';

    let mounted: boolean = false;
    let canvas: HTMLCanvasElement;

    onMount(() => {
        mounted = true;
        updateCrop();
    });

    $: if (file || cropperProps) {
        updateCrop();
    }

    function updateCrop(): void {
        if (!mounted) {
            return;
        }
        if (!file) {
            return;
        }

        const context = canvas.getContext('2d');
        const reader = new FileReader();
        reader.onload = (e) => {
            const image = new Image();
            image.onload = () => {
                canvas.height = cropperProps.height;
                canvas.width = cropperProps.width;
                context?.drawImage(
                    image,
                    cropperProps.x,
                    cropperProps.y,
                    cropperProps.width,
                    cropperProps.height,
                    0,
                    0,
                    cropperProps.width,
                    cropperProps.height
                );
            };
            if (e.target?.result) {
                image.src = e.target.result as string;
            }
        };
        reader.readAsDataURL(file);
    }
</script>

<canvas bind:this={canvas}
        class={classes}
        aria-label={ariaLabel}></canvas>

<style>
    .default-cropped {
        border-radius: var(--border-radius);
        border: 1px solid var(--line-color);
    }
</style>
