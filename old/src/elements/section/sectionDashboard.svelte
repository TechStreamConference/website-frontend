<script lang="ts">
    export let classes: string = '';
</script>

<section class={classes}>
    <slot />
</section>

<style>
    section {
        margin-bottom: var(--4x-margin);
        padding:       0 var(--4x-padding);
        width:         100%;
        align-self:    center;
    }

    .standard-dashboard-section {
        max-width:      100rem;
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
    }

    .wide-dashboard-section-override {
        max-width: 150rem !important;
    }
</style>
