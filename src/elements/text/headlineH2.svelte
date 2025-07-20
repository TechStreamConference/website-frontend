<script lang="ts">
    export let classes: string = '';

    export let size: string = 'headline-h2-big';
</script>

<h2 class="headline-font {size} {classes}">
    <slot/>
</h2>

<style>
    h2 {
        text-align: center;
    }

    .headline-h2-big {
        font-size: var(--3x-font-size);
        line-height: var(--3x-line-height);
    }

    .headline-h2-small {
        font-size: var(--2x-font-size);
        line-height: var(--2x-line-height);
    }

    .headline-h2-border {
        padding-bottom: var(--2x-padding);
        border-bottom: 1px solid var(--line-color);
    }

    @media (max-width: 600px) {
        .headline-h2-big {
            font-size: var(--2x-font-size);
            line-height: var(--2x-line-height);
        }

        .headline-h2-small {
            font-size: var(--full-font-size);
            line-height: var(--full-line-height);
        }
    }
</style>
