<script lang="ts">
    export let classes: string = '';
    export let itemprop: string = '';
</script>

<p class="normal-font {classes}"
   itemprop={itemprop?? undefined}>
    <slot/>
</p>

<style>
    p {
        font-size: var(--full-font-size);
        line-height: 1.5;
        text-wrap: wrap;
        text-align: var(--text-align);
        width: var(--width);
    }

    .paragraph-white {
        color: var(--white-color);
    }

    .paragraph-gray {
        color: var(--gray-text-color);
    }

    .paragraph-pre-wrap {
        white-space: pre-wrap;
    }
</style>
