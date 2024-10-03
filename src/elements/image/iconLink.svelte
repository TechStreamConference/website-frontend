<script lang="ts">
	import Icon from './icon.svelte';
	import type { SocialMediaLink } from 'types/provideTypes';
	export let linkType: SocialMediaLink;
	export let title: string;
</script>

<a href={linkType.url} target="_blank" rel="noopener noreferrer" class="icon" {title} on:click>
	<Icon type={linkType.name} />
</a>

<style>
	.icon {
		background-color: var(--primary-color-light);
		transition: var(--transition-duration);
		border-radius: var(--border-radius);
	}

	.icon:hover {
		background-color: var(--primary-color-mid);
		box-shadow: 4px 4px var(--gray-color);
		transform: translateY(-4px) translateX(-4px);
		transition: var(--transition-duration);
	}

	.icon:active {
		background-color: var(--primary-color-dark);
		box-shadow: 1px 1px var(--gray-color-light);
		transform: translateY(0px) translateX(0px);
		transition: var(--transition-duration-fast);
	}

	@media (max-width: 1280px) {
		.icon:hover {
			background-color: var(--primary-color-light);
			box-shadow: none;
			transition: var(--transition-duration);
		}

		.icon:active {
			box-shadow: 2px 2px var(--gray-color-light);
			transition: var(--transition-duration-fast);
		}
	}
</style>
