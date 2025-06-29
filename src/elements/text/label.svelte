<script lang="ts">
    export let for_: string = '';
    export let classes: string = "";
</script>

<label class="normal-font {classes}"
       for={for_}>
    <slot/>
</label>

<style>
    label {
        font-size: var(--full-font-size);
        line-height: var(--full-line-height);
    }
</style>
