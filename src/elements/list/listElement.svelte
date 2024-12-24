<script lang="ts">
    export let classes: string = '';
</script>

<li class="normal-font {classes}">
    <slot/>
</li>

<style>
    li {
        font-size:       var(--full-font-size);
        list-style-type: none;
    }

    .list-element-dot {
        list-style-type: disc;
    }
</style>
