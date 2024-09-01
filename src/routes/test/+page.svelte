<script>
	import Headline from 'elements/text/headline.svelte';
	import Subheadline from 'elements/text/subheadline.svelte';
	import Textline from 'elements/text/textline.svelte';
	import Textblock from 'elements/text/textblock.svelte';
	import Input from 'elements/input/input.svelte';
	import Button from 'elements/input/button.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';
	import VerticalLine from 'elements/line/verticalLine.svelte';
</script>

<p>Hedline big:</p>
<Headline>Headline Big</Headline>
<p>Headline small:</p>
<Headline size="small">Headline Small</Headline>
<p>Subheadline big:</p>
<Subheadline>Subheadline Big</Subheadline>
<p>Subheadline small:</p>
<Subheadline size="small">Subheadline Small</Subheadline>
<p>Textline:</p>
<Textline>Bester Text Line</Textline>
<p>Text Block:</p>
<Textblock
	>lkajsdghflkajsdhfglkjashdflkjahsdflkjahlfkjhalksdjfhlakjsdhflkjahdflkjhadflkjkbdf
	asddlfkjhasdflkjhsdlfkjhhasdlfkjhasdlkfjha sdflkjasdhf laksjdfhalskdjfh alskjdfh alskjdfh
	asdlfkjhas dflkjashdf alksdjfh alksdjfh aldskjf alkjsdjhf alksdjfh alkdsjfh alksjdfhj aslkdjfh
	asldkjfh alskjdfh alskdjfhasdlkjfh alskjdf alksdjfh alkjdsfh alkjsdjfh alkjsdfh alkjdsfh alkdsjjfh
	alkjdhf aldskfjh aldskjfh aljkdsh flkadjshf alksjdhf
</Textblock>
<p>Input Text:</p>
<Input id="test-01" type="text" placeholderText="test-01" />
<p>Input Password:</p>
<Input id="test-02" type="password" placeholderText="test-02" />
<p>Button:</p>
<Button>Test Button</Button>
<p>horizonral line:</p>
<HorizontalLine --width="10rem" />
<p>vertical line:</p>
<VerticalLine --height="10rem" />

<style>
	p {
		margin: 1rem;
		color: var(--text-color);
	}
</style>
