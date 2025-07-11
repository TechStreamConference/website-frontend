<script lang="ts">
    import type {CropperProps} from "types/cropperTypes";

    export let file: Blob;
    export let croppingOffset: number = 100;
    export let cropperProps: CropperProps;

    let canvas: HTMLCanvasElement;
    let cropperWrapper: HTMLDivElement;
    let cropped: boolean = false;

    let heightPercent: number = 0;
    $: heightPercent = (() => {
        if (!isValidHTMLValues()) {
            return 0;
        }
        return calculateRelativeCropperOffset(canvas.height, cropperWrapper.scrollHeight);
    })();

    let widthPercent: number = 0;
    $: widthPercent = (() => {
        if (!isValidHTMLValues()) {
            return 0;
        }
        return calculateRelativeCropperOffset(canvas.width, cropperWrapper.scrollWidth);
    })();

    function isValidHTMLValues(): boolean {
        return canvas && cropperWrapper;
    }

    function calculateRelativeCropperOffset(canvas: number, wrapper: number): number {
        const percent = croppingOffset / canvas;
        return wrapper * percent;
    }


    $: if (!cropped && file) {
        crop();
        cropped = true;
    }

    function crop(): void {
        if (!file) {
            console.log("No file to crop");
            return;
        }

        const context = canvas.getContext('2d');
        const reader = new FileReader();
        reader.onload = (e) => {
            const image = new Image();
            image.onload = () => {
                canvas.height = cropperProps.height + 2 * croppingOffset;
                canvas.width = cropperProps.width + 2 * croppingOffset;
                context?.drawImage(
                    image,
                    cropperProps.x - croppingOffset,
                    cropperProps.y - croppingOffset,
                    cropperProps.width + 2 * croppingOffset,
                    cropperProps.height + 2 * croppingOffset,
                    0,
                    0,
                    cropperProps.width + 2 * croppingOffset,
                    cropperProps.height + 2 * croppingOffset,
                );
            };
            if (e.target?.result) {
                image.src = e.target.result as string;
            }
        };
        reader.readAsDataURL(file);
    }

</script>

<div
        bind:this={cropperWrapper}
        class="cropper-wrapper">
    <canvas
            bind:this={canvas}
            class="cropper-canvas"
    ></canvas>
    <div
            class="cropper-background-overlay"
            style="
                top: 0;
                left: 0;
                right: 0;
                height: {heightPercent}px;
            "
    ></div>
    <div
            class="cropper-background-overlay"
            style="
                bottom: 0;
                left: 0;
                right: 0;
                height: {heightPercent}px;
            "
    ></div>
    <div
            class="cropper-background-overlay"
            style="
                top: {heightPercent}px;
                left: 0;
                bottom: {heightPercent}px;
                width: {widthPercent}px;
            "

    ></div>
    <div
            class="cropper-background-overlay"
            style="
                top: {heightPercent}px;
                right: 0;
                bottom: {heightPercent}px;
                width: {widthPercent}px;"
    ></div>
    <div
            class="cropper-overlay"
            style="
                top: {heightPercent}px;
                left: {widthPercent}px;
                bottom: {heightPercent}px;
                right: {widthPercent}px;
            "
    >
        <div class="cropper-overlay-inlay inlay-horizontal inlay-top"></div>
        <div class="cropper-overlay-inlay inlay-horizontal inlay-bottom"></div>
        <div class="cropper-overlay-inlay inlay-vertical inlay-left"></div>
        <div class="cropper-overlay-inlay inlay-vertical inlay-right"></div>


    </div>
</div>

<style>
    .cropper-wrapper {
        position: relative;
        width: 60rem;
        border: 1px solid black;
        border-radius: var(--border-radius);
    }

    .cropper-canvas {
        width: 100%;
        height: 100%;
    }

    .cropper-background-overlay {
        position: absolute;
        background-color: var(--cropper-overlay-transparent);
    }

    .cropper-overlay {
        position: absolute;
        border: 2px solid var(--gray-color);
        background-color: transparent;
    }

    .cropper-overlay-inlay {
        position: absolute;
        background-color: var(--gray-color);
    }

    .inlay-horizontal {
        left: 0;
        right: 0;
        height: 1px;
    }

    .inlay-vertical {
        top: 0;
        bottom: 0;
        width: 1px;
    }

    .inlay-top {
        top: 33.33%;
    }

    .inlay-bottom {
        bottom: 33.33%;
    }

    .inlay-left {
        left: 33.33%;
    }

    .inlay-right {
        right: 33.33%;
    }
</style>
