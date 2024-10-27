<script lang="ts">
	export let id: string = '';
	export let classes: string = '';
</script>

<section {id} class="section {classes}"><slot /></section>

<style>
	.section {
		margin-bottom: var(--4x-margin);
		padding: 0 var(--4x-padding);
		width: 100%;
		align-self: center;
	}
</style>
