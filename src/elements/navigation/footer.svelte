<script lang="ts">
	import type { MenuItem } from 'types/provideTypes';
	import TextLine from 'elements/text/textLine.svelte';
	import List from 'elements/list/list.svelte';
	import ListElement from 'elements/list/listElement.svelte';
	import Link from 'elements/text/link.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';
	import LogoBig from 'elements/image/logoBig.svelte';

	export let currentYear: number;
	export let menu: MenuItem[];

	const startYear: number = 2024;

	const numbers: number[] = Array.from(
		{ length: currentYear + 1 - startYear },
		(_, i) => startYear + i
	);
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
				{#each numbers as number}
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
			<Paragraph classes={'white'}>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
				invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
				et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
				Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
				diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
				gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
				amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
				dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
				et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
				amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
				consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
				odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
				nulla facilisi. Lorem ipsum dolor sit amet, -- ich habe 200 Wörter.
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
