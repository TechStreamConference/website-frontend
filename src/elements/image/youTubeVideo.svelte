<script lang="ts">
    export let title: string;
    export let id: string;

    export let classes: string = "";
</script>

<div class="{classes}">
    <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/{id}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          {title}
    />
</div>

<style>
    div {
        position:       relative;
        height:         0;
        padding-bottom: 56.25%;
    }

    iframe {
        position:      absolute;
        top:           0;
        left:          0;
        width:         100%;
        height:        100%;
        border-radius: var(--border-radius);
    }
</style>
