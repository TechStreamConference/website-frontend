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
		border-radius: var(--border-radius);
	}

	.hover {
		transition: var(--transition-duration);
		padding: 0.5rem;
		background-color: none;
	}

	.hover:hover {
		background-color: var(--primary-color-mid);
		box-shadow: 4px 4px var(--gray-color);
		transform: translateY(-4px) translateX(-4px);
		transition: var(--transition-duration);
	}

	.hover:active {
		background-color: var(--primary-color-dark);
		box-shadow: 1px 1px var(--gray-color-light);
		transform: translateY(0px) translateX(0px);
		transition: var(--transition-duration-fast);
	}

	@media (max-width: 1280px) {
		.hover:hover {
			background-color: var(--primary-color-light);
			box-shadow: none;
			transition: var(--transition-duration);
		}

		.hover:active {
			box-shadow: 2px 2px var(--gray-color-light);
			transition: var(--transition-duration-fast);
		}
	}
</style>
