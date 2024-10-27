<script lang="ts">
	export let classes: string = 'image-default';
	export let alt: string;
	export let src: string;
</script>

<img class={classes} {src} {alt} />

<style>
	.image-default {
		max-height: 100%;
		max-width: 100%;
		height: auto;
		width: auto;
		border-radius: var(--border-radius);
	}
</style>
