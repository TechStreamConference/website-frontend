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
</style>
