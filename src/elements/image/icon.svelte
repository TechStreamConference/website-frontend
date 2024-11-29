<script lang="ts">
	import '@fortawesome/fontawesome-free/css/all.min.css';

	export let type: string;

	export let classes: string = '';

	import { iconLookup } from 'lookup/iconLookup';
</script>

<i class="fa {iconLookup(type)} {classes}" aria-hidden="true" />

<style>
	i {
		display: inline-block;
		color: var(--secondary-color);
		font-size: var(--1-5x-font-size);
	}
</style>
