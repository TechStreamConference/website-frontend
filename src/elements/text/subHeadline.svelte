<script lang="ts">
    export let classes: string = '';
    export let size: 'sub-headline-small' | 'sub-headline-big' = 'sub-headline-big';
    export let id: string = '';

    export let itemProp: string = '';
    export let dateProps: { prop: string, content: string }[] = [];
</script>

<h2 itemprop="{itemProp ?? undefined}"
    id={id || undefined}
    class="sub-headline-font {classes} {size}">
    <slot/>

    {#each dateProps as {prop, content}}
        <time itemprop={prop}
              datetime={content}
        ></time>
    {/each}
</h2>


<style>
    .sub-headline-center {
        text-align: center;
    }

    .sub-headline-big {
        font-size: var(--1-5x-font-size);
        line-height: var(--1-5x-line-height);
    }

    .sub-headline-small {
        font-size: var(--full-font-size);
        line-height: var(--full-line-height);
    }

    .sub-headline-white {
        color: var(--white-color);
    }
</style>
