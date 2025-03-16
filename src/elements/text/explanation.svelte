<script lang="ts">
    import Paragraph from './paragraph.svelte';
</script>

<div class="explanation-wrapper">
    <Paragraph>
        <slot />
    </Paragraph>
</div>

<style>
    .explanation-wrapper {
        width: 100%;
        border : 1px solid var(--text-color);
        border-radius : var(--border-radius);
        padding: var(--full-padding);
        text-align: center;
    }
</style>
