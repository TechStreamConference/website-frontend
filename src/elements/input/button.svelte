<script lang="ts">
	import { typeWorkaround } from 'types/workaround';
	export let type: string = 'button';
	export let classes: string = 'text';
	export let ariaLabel: string;
</script>

<button class="hover-move {classes}" use:typeWorkaround={type} on:click aria-label={ariaLabel}>
	<slot />
</button>

<style>
	button {
		background-color: var(--primary-color-light);
		border: none;
		border-radius: var(--border-radius);
		justify-self: center;
	}

	.text {
		padding: 1rem 2rem;
		font-size: 1rem;
		line-height: 1.5rem;
		letter-spacing: 1px;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		color: var(--white-color);
	}
</style>
