<script lang="ts">
	import '@fortawesome/fontawesome-free/css/all.min.css';

	import type { IconLink } from 'types/provideTypes';
	export let linkType: IconLink;
	export let person: string;

	import { iconLookup } from 'lookup/iconLookup';
</script>

<a href={linkType.link} target="_blank" rel="noopener noreferrer" class="icon" title="{linkType.type} von {person} besuchen" on:click >
	<i class="fa {iconLookup(linkType.type)}" aria-hidden="true"/>
</a>

<style>
	.icon {
		display: inline-block;
		color: var(--green-color);
		font-size: 1.6rem;
		line-height: 2.3rem;
		text-align: center;
		padding: 0.2rem;
		background-color: var(--primary-color);
		transition: var(--transition-duration);
		border-radius: var(--border-radius);
		height: 2.5rem;
		width: 2.5rem;
	}

	.icon:hover {
		background-color: var(--secondary-color);
		box-shadow: 4px 4px var(--gray-color);
		transform: translateY(-4px) translateX(-4px);
		transition: var(--transition-duration);
	}

	.icon:active {
		background-color: var(--third-color);
		box-shadow: 1px 1px var(--light-gray-color);
		transform: translateY(0px) translateX(0px);
		transition: var(--fast-transition-duration);
	}

	@media (max-width: 1280px) {
		.icon:hover {
			background-color: var(--primary-color);
			box-shadow: none;
			transition: var(--transition-duration);
		}

		.icon:active {
			box-shadow: 2px 2px var(--light-gray-color);
			transition: var(--fast-transition-duration);
		}
	}
</style>
