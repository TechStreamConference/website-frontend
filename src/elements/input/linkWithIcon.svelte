<script lang="ts">
	import Icon from 'elements/image/icon.svelte';
	import Link from 'elements/text/link.svelte';

	export let newTab: boolean = true;

	export let href: string;
	export let title: string;
	export let icon: string;
</script>

<Link {href} classes="link-white" {newTab} {title}>
	<div class="hover-move year-event-links-entry-wrapper">
		<Icon type={icon} />
		<slot />
	</div>
</Link>

<style>
	.year-event-links-entry-wrapper {
		display: flex;
		align-items: center;
		gap: var(--half-gap);
		background-color: var(--primary-color-light);
		padding: var(--quad-padding) var(--full-padding) var(--quad-padding) var(--half-padding);
		border-radius: var(--border-radius);
		justify-self: center;
	}
</style>
