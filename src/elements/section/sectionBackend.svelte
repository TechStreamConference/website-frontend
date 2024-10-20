<script lang="ts">
	export let id: string = '';
	export let classes: string = '';
</script>

<section {id} class="section {classes}"><slot /></section>

<style>
	.section {
		margin: 0 auto 5rem;
	}
</style>
