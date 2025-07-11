<script lang="ts">
    import type {CropperProps} from "types/cropperTypes";
    import {onMount} from "svelte";

    export let file: Blob;
    export let croppingOffset: number = 100;
    export let cropperProps: CropperProps;

    let canvas: HTMLCanvasElement;
    let cropperWrapper: HTMLDivElement;
    let cropped: boolean = false;

    let isDragging: boolean = false;
    let lastMouseX: number = 0;
    let lastMouseY: number = 0;

    const MOVEMENT_SPEED: number = 10;
    const ZOOM_SPEED: number = 0.1;
    const MIN_ZOOM_SCALE: number = 0.1;
    const MAX_ZOOM_SCALE: number = 5.0;

    let originalWidth: number = 0;
    let originalHeight: number = 0;
    let currentZoomScale: number = 1.0;

    onMount(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });


    // relative cropping offset
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
        return !!canvas && !!cropperWrapper;
    }

    function calculateRelativeCropperOffset(canvas: number, wrapper: number): number {
        const percent = croppingOffset / canvas;
        return wrapper * percent;
    }

    // crop & clamp
    $: if (!cropped && file) {
        originalWidth = cropperProps.width;
        originalHeight = cropperProps.height;
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

    // mouse input
    function handleMouseDown(event: MouseEvent): void {
        if (event.button !== 0) {
            return;
        }
        isDragging = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }

    function handleMouseUp(): void {
        isDragging = false;
    }

    function handleMouseMove(event: MouseEvent): void {
        if (!isDragging) {
            return;
        }

        const deltaX = event.clientX - lastMouseX;
        const deltaY = event.clientY - lastMouseY;

        const scaleX = canvas.width / cropperWrapper.scrollWidth;
        const scaleY = canvas.height / cropperWrapper.scrollHeight;

        cropperProps = {
            ...cropperProps,
            x: cropperProps.x - deltaX / scaleX,
            y: cropperProps.y - deltaY / scaleY,
        }

        lastMouseX = event.clientX;
        lastMouseY = event.clientY;

        crop();
    }

    function handleWheel(event: WheelEvent): void {
        event.preventDefault();

        const zoomFactor = event.deltaY > 0 ? 1.0 + ZOOM_SPEED : 1.0 - ZOOM_SPEED;
        const newScale = currentZoomScale * zoomFactor;

        if (newScale < MIN_ZOOM_SCALE || newScale > MAX_ZOOM_SCALE) {
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const relativeX = mouseX / canvas.width;
        const relativeY = mouseY / canvas.height;

        const newWidth = originalWidth * newScale;
        const newHeight = originalHeight * newScale;

        const widthDiff = newWidth - cropperProps.width;
        const heightDiff = newHeight - cropperProps.height;
        const xAdjust = widthDiff * relativeX;
        const yAdjust = heightDiff * relativeY;

        cropperProps = {
            ...cropperProps,
            x: cropperProps.x - xAdjust,
            y: cropperProps.y - yAdjust,
            width: newWidth,
            height: newHeight,
        }

        currentZoomScale = newScale;
        crop();
    }

    // keyboard input
    function handleKeyMove(deltaX: number, deltaY: number): void {
        const scaleX = canvas.width / cropperWrapper.scrollWidth;
        const scaleY = canvas.height / cropperWrapper.scrollHeight;

        cropperProps = {
            ...cropperProps,
            x: cropperProps.x - deltaX / scaleX,
            y: cropperProps.y - deltaY / scaleY,
        }

        crop();
    }

    function handleKeyZoom(zoomIn: boolean): void {
        const zoomFactor = zoomIn ? 1.0 + ZOOM_SPEED : 1.0 - ZOOM_SPEED;
        const newScale = currentZoomScale * zoomFactor;

        if (newScale < MIN_ZOOM_SCALE || newScale > MAX_ZOOM_SCALE) {
            return;
        }

        const newWidth = originalWidth * newScale;
        const newHeight = originalHeight * newScale;

        const relativeX = 0.5;
        const relativeY = 0.5;

        const widthDiff = newWidth - cropperProps.width;
        const heightDiff = newHeight - cropperProps.height;
        const xAdjust = widthDiff * relativeX;
        const yAdjust = heightDiff * relativeY;

        cropperProps = {
            ...cropperProps,
            width: newWidth,
            height: newHeight,
            x: cropperProps.x - xAdjust,
            y: cropperProps.y - yAdjust,
        };

        currentZoomScale = newScale;
        crop();
    }

    function handleKeyDown(event: KeyboardEvent): void {
        switch (event.key.toLowerCase()) {
            case 'a':
                handleKeyMove(-MOVEMENT_SPEED, 0);
                break;
            case 'd':
                handleKeyMove(MOVEMENT_SPEED, 0);
                break;
            case 'w':
                handleKeyMove(0, -MOVEMENT_SPEED);
                break;
            case 's':
                handleKeyMove(0, MOVEMENT_SPEED);
                break;
            case 'q':
                handleKeyZoom(false);
                break;
            case 'e':
                handleKeyZoom(true);
                break;
            default:
                return;
        }

        event.preventDefault();
    }

</script>

<div
        bind:this={cropperWrapper}
        class="cropper-wrapper"
        on:mousedown={handleMouseDown}
        on:mouseup={handleMouseUp}
        on:mousemove={handleMouseMove}
        on:mouseleave={handleMouseUp}
        on:wheel={handleWheel}
>
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
