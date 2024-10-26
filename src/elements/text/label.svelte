<script lang="ts">
	export let for_: string = '';
</script>

<label for={for_}><slot /></label>

<style>
	label {
		font-size: 1rem;
		line-height: 1.5rem;
	}
</style>
