<script lang="ts">
	export let id: string = '';
	export let classes: string = '';
</script>

<section {id} class="section {classes}"><slot /></section>

<style>
	.section {
		scroll-margin-top: 7rem;
		margin: 10rem auto;
	}

	@media (max-width: 1280px) {
		.section {
			margin: 7rem auto;
		}
	}

	@media (max-width: 600px) {
		.section {
			margin: 5rem auto;
		}
	}
</style>
