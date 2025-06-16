<script lang="ts">
    export let videoPath;
    export let picturePath;


    export let ariaLabel: string;
</script>

<div class="general-video-wrapper">
    <video class="general-video" aria-label={ariaLabel} poster={picturePath} controls playsinline>
        <source src={videoPath} type="video/mp4"/>
    </video>
</div>

<style>
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
