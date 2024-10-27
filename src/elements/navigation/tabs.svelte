<script lang="ts">
	import TextLine from 'elements/text/textLine.svelte';
	import { typeWorkaround } from 'types/workaround';
	import type { Menu } from 'types/provideTypes';
	import { goto, onNavigate } from '$app/navigation';

	export let entries: Menu;
	export let classes: string = '';
	export let alignment: string = 'center';
	export let background: string = 'background';
	export let color: string = '';

	let current: number = 0;
	let next: number = 0;

	onNavigate(() => {
		current = next;
	});

	function setActive(index: number, url: string): void {
		next = index;
		goto(url);
	}
</script>

<div class="global-tabs-wrapper {classes} {alignment} {background}">
	{#each entries as entry, index}
		<div
			class="entry {index === current ? 'active background' : background}"
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
				<TextLine classes="entry-text {index === current ? '' : color}">{entry.name}</TextLine>
			</button>
		</div>
	{/each}
</div>

<style>
	.global-tabs-wrapper {
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid var(--line-color);
		padding: 0 var(--2x-padding);
		margin-bottom: var(--full-margin);
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
		transition: background-color var(--transition-duration);

      margin: var(--full-margin) var(--full-margin) 0;
      padding: var(--full-padding);

      cursor: pointer;

		border-top-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);
	}

	.entry:hover {
		background-color: var(--background-color-light);
		transition: background-color var(--transition-duration);
	}

	.active {
		transform: translateY(1px);
		border: 1px solid var(--line-color);
		border-top-right-radius: var(--border-radius);
		border-top-left-radius: var(--border-radius);
		border-bottom-color: transparent;
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
        margin: var(--half-margin) var(--half-margin) 0;
        padding: var(--half-padding);
    }

		.global-tabs-wrapper :global(.entry-text) {
			font-size: 1rem;
		}
	}
</style>
