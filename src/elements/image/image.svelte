<script lang="ts">
    export let alt: string;
    export let src: string;

    export let classes: string = 'image-default';
</script>

<img class={classes}
     {src}
     {alt} />

<style>
    .image-default {
        max-height:    100%;
        max-width:     100%;
        height:        auto;
        width:         auto;
        border-radius: var(--border-radius);
    }
</style>
