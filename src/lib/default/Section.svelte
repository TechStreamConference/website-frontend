<script lang="ts">
    export let id: string      = '';
    export let classes: string = '';
</script>

<section {id}
         class={classes}>
    <slot />
</section>

<style>
    section {
        scroll-margin-top: var(--16x-margin);
    }

    @media (max-width: 1280px) {
        section {
            scroll-margin-top: var(--8x-margin);
        }
    }
</style>
