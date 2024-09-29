<script lang="ts">
	export let classes: string = '';
</script>

<ul class={classes}>
	<slot />
</ul>

<style>
	ul {
		padding: var(--padding);
	}

	.padding-left {
		padding-left: 2rem;
	}
</style>
