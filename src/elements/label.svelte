<script>
	export let labelText = '';
	export let id = '';
</script>

<label for={id}>{labelText}</label>

<style>
	label {
		font-size: 1.5rem;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		color: var(--text-color);
	}
</style>
