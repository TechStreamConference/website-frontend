<script lang="ts">
	import TextLine from 'elements/text/textLine.svelte';
	import { typeWorkaround } from 'types/workaround';
	import type { Menu } from 'types/provideTypes';
	import { goto } from '$app/navigation';

	export let entries: Menu;
	export let classes: string = '';
	export let alignment: string = 'center';
	export let background: string = 'background';

	let current: number = 0;

	function setActive(index: number, url: string): void {
		current = index;
		goto(url);
	}
</script>

<div class="wrapper global-tabs-wrapper {classes} {alignment} {background}">
	{#each entries as entry, index}
		{#if index === current}
			<div
				class="entry active background"
				on:click={() => {
					setActive(index, entry.url);
				}}
				role="presentation"
			>
				<button
					class="button"
					use:typeWorkaround={'button'}
					on:click={() => {
						setActive(index, entry.url);
					}}
					aria-label={entry.description}
				>
					<TextLine classes="entry-text">{entry.name}</TextLine>
				</button>
			</div>
		{:else}
			<div
				class="entry inactive {background}"
				on:click={() => {
					setActive(index, entry.url);
				}}
				role="presentation"
			>
				<button
					class="button"
					use:typeWorkaround={'button'}
					on:click={() => {
						setActive(index, entry.url);
					}}
					aria-label={entry.description}
				>
					<TextLine classes="entry-text">{entry.name}</TextLine>
				</button>
			</div>
		{/if}
	{/each}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid var(--line-color);
		padding: 0 3rem;
		margin: 2rem 0 1rem;
		width: 100%;
	}

	.center {
		justify-content: center;
	}

	.end {
		justify-content: end;
	}

	.purple {
		background-color: var(--primary-color-dark);
	}

	.background {
		background-color: var(--background-color);
	}

	.entry {
		transform: translateY(1px);
		transition: background-color var(--transition-duration);

		margin: 1rem;
		margin-bottom: 0;
		padding: 1rem;
		padding-bottom: 1.2rem;

		border: 1px solid;
		border-top-right-radius: var(--border-radius);
		border-top-left-radius: var(--border-radius);
		transition: border-color var(--transition-duration);

		cursor: pointer;
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
		cursor: pointer;
	}

	@media (max-width: 600px) {
		.entry {
			margin: 0.5rem;
			margin-bottom: 0;
			padding: 0.5rem;
			padding-bottom: 0.6rem;
		}

		.global-tabs-wrapper :global(.entry-text) {
			font-size: 1rem;
		}
	}
</style>
