<script lang="ts">
	import Icon from './icon.svelte';
	import type { IconLink } from 'types/provideTypes';
	export let linkType: IconLink;
	export let title: string;
</script>

<a href={linkType.link} target="_blank" rel="noopener noreferrer" class="icon" {title} on:click>
	<Icon type={linkType.name} />
</a>

<style>
	.icon {
		background-color: var(--primary-color-light);
		transition: var(--transition-duration);
		border-radius: var(--border-radius);
	}

	.icon:hover {
		background-color: var(--secondary-color);
		box-shadow: 4px 4px var(--gray-color);
		transform: translateY(-4px) translateX(-4px);
		transition: var(--transition-duration);
	}

	.icon:active {
		background-color: var(--third-color);
		box-shadow: 1px 1px var(--light-gray-color);
		transform: translateY(0px) translateX(0px);
		transition: var(--fast-transition-duration);
	}

	@media (max-width: 1280px) {
		.icon:hover {
			background-color: var(--primary-color-light);
			box-shadow: none;
			transition: var(--transition-duration);
		}

		.icon:active {
			box-shadow: 2px 2px var(--light-gray-color);
			transition: var(--fast-transition-duration);
		}
	}
</style>
