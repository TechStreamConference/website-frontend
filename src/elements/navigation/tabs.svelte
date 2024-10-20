<script lang="ts">
	import TextLine from 'elements/text/textLine.svelte';
	import { typeWorkaround } from 'types/workaround';

	export let entries: { entry: string; callback: Function }[];

	let current: number = 0;

	function setActive(index: number): void {
		current = index;
		callCallback();
	}

	function callCallback(): void {
		entries[current].callback();
	}
</script>

<div class="wrapper global-tabs-wrapper">
	{#each entries as entry, index}
		{#if index === current}
			<div
				class="entry active"
				on:click={() => {
					setActive(index);
				}}
				role="presentation"
			>
				<button
					class="button"
					use:typeWorkaround={'button'}
					on:click={() => {
						setActive(index);
					}}
					aria-label="Klicke um zu {entry.entry} zu navigieren"
				>
					<TextLine classes="entry-text">{entry.entry}</TextLine>
				</button>
			</div>
		{:else}
			<div
				class="entry inactive"
				on:click={() => {
					setActive(index);
				}}
				role="presentation"
			>
				<button
					class="button"
					use:typeWorkaround={'button'}
					on:click={() => {
						setActive(index);
					}}
					aria-label="Klicke um zu {entry.entry} zu navigieren"
				>
					<TextLine classes="entry-text">{entry.entry}</TextLine>
				</button>
			</div>
		{/if}
	{/each}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: row;
		justify-content: center;
		border-bottom: 1px solid var(--line-color);
		padding: 0 3rem;
		margin: 2rem auto 0;
	}

	.entry {
		transform: translateY(1px);
		background-color: var(--background-color);
		transition: background-color var(--transition-duration);

		margin: 1rem;
		margin-bottom: 0;
		padding: 1rem;
		padding-bottom: 1.2rem;

		border: 1px solid;
		border-top-right-radius: var(--border-radius);
		border-top-left-radius: var(--border-radius);
		transition: border-color var(--transition-duration);
	}

	.entry:hover {
		background-color: var(--background-color-light);
		transition: background-color var(--transition-duration);
	}

	.active {
		border-color: var(--line-color);
		border-bottom-color: transparent;
		transition: border-color var(--transition-duration);
	}

	.inactive {
		border-color: transparent;
		border-bottom-color: var(--line-color);
		transition: border-color var(--transition-duration);
	}

	.global-tabs-wrapper :global(.entry-text) {
		font-size: 1.5rem;
	}

	.button {
		border: none;
		background-color: transparent;
	}
</style>
