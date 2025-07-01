<script lang="ts">
    import { onMount } from 'svelte';

    export let x: number;
    export let y: number;
    export let size: number;
    export let file: Blob;
    export let alt: string;
    export let classes: string = '';

    let mounted: boolean = false;
    let canvas: HTMLCanvasElement;

    onMount(() => {
        mounted = true;
        updateCrop();
    });

    $: if (file || x || y || size) {
        updateCrop();
    }

    function updateCrop(): void {
        if (!mounted) {
            return;
        }

        const context = canvas.getContext('2d');

        const reader  = new FileReader();
        reader.onload = (e) => {
            const image  = new Image();
            image.onload = () => {
                canvas.height = size;
                canvas.width  = size;
                context?.drawImage(image, x, y, size, size, 0, 0, size, size);
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
        aria-label={alt} ></canvas>
