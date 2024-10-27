<script lang="ts">
	export let for_: string = '';
</script>

<label for={for_}><slot /></label>

<style>
	label {
		font-size: 1rem;
		line-height: 1.5rem;
		letter-spacing: 1px;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		color: var(--text-color);
	}
</style>
