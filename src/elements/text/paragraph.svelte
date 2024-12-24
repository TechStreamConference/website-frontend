<script lang="ts">
    export let classes: string = '';
</script>

<p class="normal-font {classes}">
    <slot/>
</p>

<style>
    p {
        font-size:   var(--full-font-size);
        line-height: var(--full-line-height);
        text-wrap:   wrap;
        text-align:  var(--text-align);
        width:       var(--width);
    }

    .paragraph-white {
        color: var(--white-color);
    }

    .paragraph-pre-wrap {
        white-space: pre-wrap;
    }

    @media (max-width: 600px) {
        p {
            font-size: var(--half-font-size);
        }
    }
</style>
