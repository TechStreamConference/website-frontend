<script lang="ts">
    export let classes: string                                 = '';
    export let size: 'sub-headline-small' | 'sub-headline-big' = 'sub-headline-big';
    export let id: string                                      = '';
</script>

<h3 id={id || undefined}
    class="sub-headline-font {classes} {size}">
    <slot />
</h3>

<style>
    .sub-headline-center {
        text-align: center;
    }

    .sub-headline-big {
        font-size:   var(--1-5x-font-size);
        line-height: var(--1-5x-line-height);
    }

    .sub-headline-small {
        font-size:   var(--full-font-size);
        line-height: var(--full-line-height);
    }

    .sub-headline-white {
        color: var(--white-color);
    }

    @media (max-width: 600px) {
        .sub-headline-big {
            font-size:   var(--full-font-size);
            line-height: var(--full-line-height);
        }

        .sub-headline-small {
            font-size:   var(--half-font-size);
            line-height: var(--half-line-height);
        }
    }
</style>
