<script lang="ts">
	import type { Images } from 'types/provideTypes';
	export let logos: Images;
	import ImageLink from './imageLink.svelte';
</script>

<div class="image-flex">
	{#each logos as logo}
		<div class="image-container">
			<ImageLink image={logo} classesLink={'logo-array-link'} />
		</div>
	{/each}
</div>

<style>
	.image-flex {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 3rem;
	}

	.image-container {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.logo-array-link) {
		height: 15rem;
	}

	@media (max-width: 600px) {
		.image-flex {
			gap: 2rem;
		}
	}
</style>
