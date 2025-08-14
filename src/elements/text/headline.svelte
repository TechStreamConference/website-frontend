<script lang="ts">
    export let classes: string = '';

    export let size: string = 'headline-big';
</script>

<h1 class="headline-font {size} {classes}">
    <slot/>
</h1>

<style>
    h1 {
        text-align: center;
    }

    .headline-big {
        font-size: var(--3x-font-size);
        line-height: var(--3x-line-height);
    }

    .headline-small {
        font-size: var(--2x-font-size);
        line-height: var(--2x-line-height);
    }

    .headline-border {
        padding-bottom: var(--2x-padding);
        border-bottom: 1px solid var(--line-color);
    }

    .headline-green {
        color: var(--secondary-color);
    }

    .headline-left {
        text-align: left;
    }

    @media (max-width: 600px) {
        .headline-big {
            font-size: var(--2x-font-size);
            line-height: var(--2x-line-height);
        }

        .headline-small {
            font-size: var(--full-font-size);
            line-height: var(--full-line-height);
        }
    }
</style>
