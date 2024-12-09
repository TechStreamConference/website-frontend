<script lang="ts">
	import Button from 'elements/input/button.svelte';
	import Cropper from 'svelte-easy-crop';

	export let image: string;
</script>

<div class="cropper-popup-wrapper" role="presentation" on:click>
	<div
		class="cropper-wrapper"
		role="presentation"
		on:click={(event) => {
			event.stopPropagation();
		}}
	>
		<Button
			fontSize="large-text"
			classes="cropper-popup-close-button"
			ariaLabel="close popup"
			on:click>&times;</Button
		>
		<Cropper {image} aspect={1 / 1} on:cropcomplete />
	</div>
</div>

<style>
	.cropper-popup-wrapper {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 10;
		background-color: var(--background-color-transparent);
	}
	.cropper-wrapper {
		position: relative;
		width: 50%;
		height: 50%;
		left: 25%;
		top: 25%;
		background-color: var(--background-color);
		border: solid 1px var(--primary-color-dark);
	}
	:global(.cropper-popup-close-button) {
		position: absolute;
		top: 0;
		right: 0;
		translate: 50% -50%;
		line-height: var(--2x-font-size);
		padding: var(--half-padding);
		z-index: 20;
	}
</style>
