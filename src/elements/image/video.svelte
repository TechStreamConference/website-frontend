<script lang="ts">
    import {apiUrl} from "helper/links.js";

    export let videoPath: string;
    export let picturePath: string;
    export let captionPath: string;

    export let ariaLabel: string;
</script>

<div class="general-video-wrapper">
    <video class="general-video" aria-label={ariaLabel} poster={apiUrl(picturePath)} controls playsinline>
        <source src={apiUrl(videoPath)} type="video/mp4"/>
        <track kind="captions" src={apiUrl(captionPath)} srclang="de" label="Deutsch"/>
    </video>
</div>

<style>
    video::cue {
        font-family: var(--normal-font-family), sans-serif;
        font-weight: var(--normal-font-weight);
        font-style: var(--normal-font-style);
        color: var(--white-color);
    }
    .general-video-wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%;
    }

    .general-video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: none;
        border-radius: var(--border-radius);
    }
</style>
