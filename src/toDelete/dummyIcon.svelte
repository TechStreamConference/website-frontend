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
	}
</style>
