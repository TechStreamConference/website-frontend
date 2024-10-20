<script lang="ts">
	import { fade } from 'svelte/transition';

	export let id: string = '';
	export let classes: string = '';
</script>

<section {id} class="section {classes}" transition:fade={{ duration: 300 }}><slot /></section>

<style>
	.section {
		margin: 5rem auto;
	}
</style>
