<script lang="ts">
	import type { IconLink } from 'types/provideTypes';
	export let linkType: IconLink;
</script>

<a href={linkType.link} target="_blank" rel="noopener noreferrer"><div class="img" /></a>

<style>
	.img {
		width: 2rem;
		height: 2rem;
		background-color: var(--primary-color);
		transition: var(--transition-duration);
		border-radius: var(--border-radius);
	}

	.img:hover {
		background-color: var(--secondary-color);
		box-shadow: 4px 4px var(--gray-color);
		transform: translateY(-4px) translateX(-4px);
		transition: var(--transition-duration);
	}

	.img:active {
		background-color: var(--third-color);
		box-shadow: 1px 1px var(--light-gray-color);
		transform: translateY(0px) translateX(0px);
		transition: var(--fast-transition-duration);
	}
</style>
