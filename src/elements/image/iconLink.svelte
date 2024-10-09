<script lang="ts">
	import Icon from './icon.svelte';
	import type { SocialMediaLink } from 'types/provideTypes';
	export let linkType: SocialMediaLink;
	export let title: string;
</script>

<a href={linkType.url} target="_blank" rel="noopener noreferrer" class="hover-move icon" {title} on:click>
	<Icon type={linkType.name} />
</a>

<style>
	.icon {
		background-color: var(--primary-color-light);
		border-radius: var(--border-radius);
	}
</style>
