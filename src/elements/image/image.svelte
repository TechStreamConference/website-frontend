<script lang="ts">
	export let classes: string = 'size-default';
	export let alt: string;
	export let src: string;
</script>

<img class={classes} {src} {alt} />

<style>
	.size-default {
		max-height: 100%;
		max-width: 100%;
		height: auto;
		width: auto;
	}
</style>
