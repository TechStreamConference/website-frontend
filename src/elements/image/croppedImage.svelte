<script lang="ts">
	export let x: number;
	export let y: number;
	export let size: number;
	export let src: string;
	export let alt: string;
</script>

<div class="cropped-image-wrapper" style="--x: {x}px; --y: {y}px; --size: {size}px">
	<img {alt} {src} class="image-cropped" />
</div>

<style>
	.cropped-image-wrapper {
		position: relative;
		width: var(--size);
		height: var(--size);
		overflow: hidden;
		align-self: center;
		border: 1px solid var(--primary-color-dark);
		border-radius: var(--border-radius);
	}

	.image-cropped {
		position: absolute;
		top: calc(-1 * var(--y));
		left: calc(-1 * var(--x));
	}
</style>
