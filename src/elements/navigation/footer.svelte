<script lang="ts">
	import type { Globals, MenuItem } from 'types/provideTypes';
	import TextLine from 'elements/text/textLine.svelte';
	import List from 'elements/list/list.svelte';
	import ListElement from 'elements/list/listElement.svelte';
	import Link from 'elements/text/link.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';
	import LogoBig from 'elements/image/logoBig.svelte';

	export let globals: Globals;
	export let menu: MenuItem[];

	const currentYear: number = new Date().getFullYear();
</script>

<footer class="navigation-footer">
	<div class="nav-wrapper">
		<nav class="nav-element">
			<TextLine classes={'white'}>Menu:</TextLine>
			<List classes="list">
				{#each menu as entry}
					<ListElement>
						<Link classes={'standard white'} href={entry.url} title={entry.description}>
							{entry.name}
						</Link>
					</ListElement>
				{/each}
			</List>
		</nav>

		<nav class="nav-element">
			<TextLine classes={'white'}>Alle Events:</TextLine>
			<List classes="list">
				{#each globals.years_with_events as number}
					<ListElement>
						<Link
							classes={'standard white'}
							href="/year/{number}"
							title="Tech Stream Conference Seite des Jahres {number} anschauen"
						>
							{number}
						</Link>
					</ListElement>
				{/each}
			</List>
		</nav>

		<div class="nav-element">
			<Paragraph classes={'white pre-wrap'}>
				{globals.footer_text}
			</Paragraph>
		</div>

		<div class="nav-element">
			<LogoBig classes="logo" />
		</div>
	</div>
	<div class="copyright">
		<TextLine classes={'white'}>&copy; Tech Stream Conference {currentYear}</TextLine>
	</div>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		background-color: var(--primary-color-light);
		padding: 2rem 0;
		color: var(--white-color);
		font-family: 'Gnuolane Extra Light', sans-serif;
		font-weight: 500;
		font-style: normal;
		letter-spacing: 2px;
		font-size: 1rem;
	}

	.nav-wrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		gap: 5rem;
		padding: 0 5rem;
	}

	.nav-element {
		flex: 1;
		min-width: 14rem;
		text-align: center;
	}

	.navigation-footer :global(.list) {
		margin-top: 1rem;
	}

	.navigation-footer :global(.logo) {
		height: 10rem;
		object-fit: contain;
		max-height: 12rem;
	}

	.copyright {
		margin-top: 2rem;
		display: flex;
		justify-content: center;
	}
</style>
