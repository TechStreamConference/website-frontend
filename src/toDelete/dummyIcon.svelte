<script lang="ts">
	import Link from 'elements/text/link.svelte';
	import type { IconLink } from 'types/provideTypes';
	export let linkType: IconLink;
</script>

<Link classes="standard inline" href={linkType.link} newTab={true}>
	<div class="img" />
</Link>

<style>
	.img {
		min-width: 1rem;
		min-height: 1rem;
	}
</style>
