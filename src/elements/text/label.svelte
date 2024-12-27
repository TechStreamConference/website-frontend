<script lang="ts">
    export let for_: string = '';
</script>

<label class="normal-font"
       for={for_}>
    <slot />
</label>

<style>
    label {
        font-size:   var(--full-font-size);
        line-height: var(--full-line-height);
    }
</style>
