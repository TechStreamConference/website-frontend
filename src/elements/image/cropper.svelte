<script lang="ts">
    import type {CropperProps} from "types/cropperTypes";
    import {onMount} from "svelte";
    import {clamp} from 'helper/basic';
    import Button from 'elements/input/button.svelte'

    export let file: Blob | null;
    let previousFile: Blob | null = null;
    export let croppingOffsetPercent: number = 0.2;
    export let cropperProps: CropperProps;
    export let classes: string = "";

    let canvas: HTMLCanvasElement;
    let cropperWrapper: HTMLElement;

    let isDragging: boolean = false;
    let lastMouseX: number = 0;
    let lastMouseY: number = 0;

    const MOVEMENT_SPEED: number = 10;
    const ZOOM_SPEED: number = 0.1;
    const MIN_ZOOM_SCALE: number = 0.1;
    let MAX_ZOOM_SCALE: number = 5.0; // this gets set in the initialDraw() to make sure one cannot scale smaller than the Viewport is.

    let originalWidth: number = 0;
    let originalHeight: number = 0;
    let currentZoomScale: number = 1.0;

    let widthOverlayOffset: number = 0;
    let heightOverlayOffset: number = 0;

    let image: HTMLImageElement | null = null;

    // initial & update
    onMount(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const width = cropperWrapper.scrollWidth;
                const croppingAreaX = width / (1.0 + 2 * croppingOffsetPercent);
                widthOverlayOffset = (width - croppingAreaX) / 2;

                const height = cropperWrapper.scrollHeight;
                const croppingAreaY = height / (1.0 + 2 * croppingOffsetPercent);
                heightOverlayOffset = (height - croppingAreaY) / 2;
            }
        });

        resizeObserver.observe(cropperWrapper);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            resizeObserver.disconnect();
        };
    });


    $: if (file != previousFile) {
        previousFile = file;
        if (file != null) {
            originalWidth = cropperProps.width;
            originalHeight = cropperProps.height;
            initialDraw();
            crop();
        }
    }

    function initialDraw(): void {
        if (!file) {
            return;
        }

        const context = canvas.getContext('2d');
        const reader = new FileReader();
        reader.onload = (e) => {
            image = new Image();
            image.onload = () => {
                if (!image) {
                    return; // this should never happen since this is the onload of the checked image
                }
                setMaxScale();
                currentZoomScale = MAX_ZOOM_SCALE;
                cropperProps.width *= MAX_ZOOM_SCALE;
                cropperProps.height *= MAX_ZOOM_SCALE;

                const offsetX = cropperProps.width * croppingOffsetPercent;
                const offsetY = cropperProps.height * croppingOffsetPercent;
                cropperProps.x = (image.width - cropperProps.width) / 2;
                cropperProps.y = (image.height - cropperProps.height) / 2;
                canvas.width = cropperProps.width + 2.0 * offsetX;
                canvas.height = cropperProps.height + 2.0 * offsetY;


                context?.drawImage(
                    image,
                    cropperProps.x - offsetX,
                    cropperProps.y - offsetY,
                    canvas.width,
                    canvas.height,
                    0,
                    0,
                    canvas.width,
                    canvas.height,
                );
            };
            if (e.target?.result) {
                image.src = e.target.result as string;
            }
        };
        reader.readAsDataURL(file);
    }

    function updateDraw(): void {
        clampImage();
        crop();
    }

    // crop & clamp
    function setMaxScale(): void {
        if (!image) {
            return;
        }
        const maxScaleX = image.width / originalWidth;
        const maxScaleY = image.height / originalHeight;
        MAX_ZOOM_SCALE = Math.min(maxScaleX, maxScaleY);
    }

    function clampImage(): void {
        if (!image) {
            return;
        }

        cropperProps.x = clamp(cropperProps.x, 0, image.width - cropperProps.width);
        cropperProps.y = clamp(cropperProps.y, 0, image.height - cropperProps.height);
    }

    function crop(): void {
        const context = canvas.getContext('2d');
        if (!context || !image) return;

        context.clearRect(0, 0, canvas.width, canvas.height);

        const offsetX = cropperProps.width * croppingOffsetPercent;
        const offsetY = cropperProps.height * croppingOffsetPercent;
        canvas.width = cropperProps.width + 2.0 * offsetX;
        canvas.height = cropperProps.height + 2.0 * offsetY;

        context.drawImage(
            image,
            cropperProps.x - offsetX,
            cropperProps.y - offsetY,
            canvas.width,
            canvas.height,
            0,
            0,
            canvas.width,
            canvas.height,
        );
    }

    // mouse / touch input
    function handlePointerDown(event: PointerEvent): void {
        cropperWrapper.setPointerCapture(event.pointerId);
        isDragging = true;

        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }

    function handlePointerUp(event: PointerEvent): void {
        cropperWrapper.releasePointerCapture(event.pointerId);
        isDragging = false;
    }

    function handlePointerMove(event: PointerEvent): void {
        if (!isDragging) {
            return;
        }

        const viewportScaleX = canvas.scrollWidth / canvas.width;
        const viewportScaleY = canvas.scrollHeight / canvas.height;

        const mouseDeltaX = (event.clientX - lastMouseX) * currentZoomScale * viewportScaleX / (1.0 + (2.0 * +croppingOffsetPercent));
        const mouseDeltaY = (event.clientY - lastMouseY) * currentZoomScale * viewportScaleY / (1.0 + (2.0 * +croppingOffsetPercent));
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;

        cropperProps = {
            ...cropperProps,
            x: cropperProps.x - mouseDeltaX,
            y: cropperProps.y - mouseDeltaY,
        }

        updateDraw();
    }

    function handleMouseZoom(event: WheelEvent): void {
        event.preventDefault();
        currentZoomScale = (() => {
            const zoomFactor = event.deltaY > 0 ? 1.0 + ZOOM_SPEED : 1.0 - ZOOM_SPEED;
            const scale = currentZoomScale * zoomFactor;
            return clamp(scale, MIN_ZOOM_SCALE, MAX_ZOOM_SCALE);
        })();

        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const relativeX = mouseX / canvas.width;
        const relativeY = mouseY / canvas.height;

        const newWidth = originalWidth * currentZoomScale;
        const newHeight = originalHeight * currentZoomScale;

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

        updateDraw();
    }

    // keyboard input
    function handleKeyMove(deltaX: number, deltaY: number): void {
        const keyDeltaX = deltaX * currentZoomScale;
        const keyDeltaY = deltaY * currentZoomScale;

        cropperProps = {
            ...cropperProps,
            x: cropperProps.x - keyDeltaX,
            y: cropperProps.y - keyDeltaY,
        }

        updateDraw();
    }

    function handleKeyZoom(zoomIn: boolean): void {
        currentZoomScale = (() => {
            const zoomFactor = zoomIn ? 1.0 + ZOOM_SPEED : 1.0 - ZOOM_SPEED;
            const scale = currentZoomScale * zoomFactor;
            return clamp(scale, MIN_ZOOM_SCALE, MAX_ZOOM_SCALE);
        })();

        const newWidth = originalWidth * currentZoomScale;
        const newHeight = originalHeight * currentZoomScale;

        cropperProps = {
            ...cropperProps,
            width: newWidth,
            height: newHeight,
        }

        updateDraw();
    }

    function handleKeyDown(event: KeyboardEvent): void {
        switch (event.key.toLowerCase()) {
            case 'a':
                handleKeyMove(MOVEMENT_SPEED, 0);
                break;
            case 'd':
                handleKeyMove(-MOVEMENT_SPEED, 0);
                break;
            case 'w':
                handleKeyMove(0, MOVEMENT_SPEED);
                break;
            case 's':
                handleKeyMove(0, -MOVEMENT_SPEED);
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

<figure
        bind:this={cropperWrapper}
        class="cropper-wrapper {classes}"
        on:pointerdown={handlePointerDown}
        on:pointerup={handlePointerUp}
        on:pointermove={handlePointerMove}
        on:wheel={handleMouseZoom}
        aria-label="Image cropper. Use mouse to drag and scroll wheel to zoom. Keyboard controls: W,A,S,D keys to move, Q to zoom out, E to zoom in"
        role="presentation"
        style={isDragging? "cursor: grabbing;" : "cursor: grab;"}
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
                height: {heightOverlayOffset}px;
            "
    ></div>
    <div
            class="cropper-background-overlay"
            style="
                bottom: 0;
                left: 0;
                right: 0;
                height: {heightOverlayOffset}px;
            "
    ></div>
    <div
            class="cropper-background-overlay"
            style="
                top: {heightOverlayOffset}px;
                left: 0;
                bottom: {heightOverlayOffset}px;
                width: {widthOverlayOffset}px;
            "

    ></div>
    <div
            class="cropper-background-overlay"
            style="
                top: {heightOverlayOffset}px;
                right: 0;
                bottom: {heightOverlayOffset}px;
                width: {widthOverlayOffset}px;"
    ></div>
    <div
            class="cropper-overlay"
            style="
                top: {heightOverlayOffset}px;
                left: {widthOverlayOffset}px;
                bottom: {heightOverlayOffset}px;
                right: {widthOverlayOffset}px;
            "
    >
        <div class="cropper-overlay-inlay inlay-horizontal inlay-top"></div>
        <div class="cropper-overlay-inlay inlay-horizontal inlay-bottom"></div>
        <div class="cropper-overlay-inlay inlay-vertical inlay-left"></div>
        <div class="cropper-overlay-inlay inlay-vertical inlay-right"></div>

    </div>
    <Button
            ariaLabel="Zoom in"
            classes={"cropper-mobile-only cropper-button-left"}
            on:click={() => handleKeyZoom(false)}
            buttonSize="small-button"
    >+
    </Button>
    <Button
            ariaLabel="Zoom out"
            classes={"cropper-mobile-only cropper-button-right"}
            on:click={() => handleKeyZoom(true)}
            buttonSize="small-button"
    >-
    </Button>
</figure>

<style>
    .cropper-wrapper {
        position: relative;
        width: min(70vw, 80rem);
        border: 1px solid black;
        border-radius: var(--border-radius);
        touch-action: none; /* because most Browser reclaims touch events otherwise */
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

    :global(.cropper-mobile-only) {
        display: none;
    }

    :global(.cropper-button-left) {
        position: absolute;
        left: 30%;
        bottom: -8.5%;
    }

    :global(.cropper-button-right) {
        position: absolute;
        right: 30%;
        bottom: -8.5%;
    }

    @media (pointer: coarse) {
        :global(.cropper-mobile-only) {
            display: block;
        }
    }


</style>
