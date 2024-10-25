<script lang="ts">
	export let id: string = '';
	export let classes: string = '';
</script>

<section {id} class="section {classes}"><slot /></section>

<style>
	.section {
		margin-bottom: 5rem;
		padding: 0 3rem;
		width: 100%;
		align-self: center;
	}
</style>
