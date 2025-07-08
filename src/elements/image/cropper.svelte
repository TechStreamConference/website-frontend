<script lang="ts">
    import CroppedImage from 'elements/image/croppedImage.svelte'
    import type {CropperProps} from "types/cropperTypes";
    import {onMount} from "svelte";

    export let src: string;
    export let ariaLabel: string;
    export let cropperProps: CropperProps = {
        x: 0,
        y: 0,
        height: 0, // Will be updated with actual image width
        width: 0,  // Will be updated with actual image height

    };

    onMount(() => {
        const img = new Image();
        img.onload = () => {
            if (cropperProps.height === 0) {
                cropperProps.height = img.height;
            }

            if (cropperProps.width === 0) {
                cropperProps.width = img.width;
            }
        }

        img.src = src;
    })

</script>

<CroppedImage
        {src}
        {ariaLabel}
        {cropperProps}
        hideOverflow={false}
/>

<style>

</style>
