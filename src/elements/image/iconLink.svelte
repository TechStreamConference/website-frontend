<script lang="ts">
	import type { SocialMediaLink } from 'types/provideTypes';
	import Icon from './icon.svelte';

	export let classes :string = "";
	export let title: string;
	export let linkType: SocialMediaLink;
</script>

<a href={linkType.url} target="_blank" rel="noopener noreferrer" class="hover-move {classes}" {title} on:click>
	<Icon type={linkType.name} />
</a>

<style>
	a {
		background-color: var(--primary-color-light);
		border-radius: var(--border-radius);
	}
</style>
