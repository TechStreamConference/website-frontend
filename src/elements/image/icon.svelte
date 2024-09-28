<script lang="ts">
	import '@fortawesome/fontawesome-free/css/all.min.css';

	export let type: string;

	import { iconLookup } from 'lookup/iconLookup';
</script>

<div class="icon">
	<i class="fa {iconLookup(type)}" aria-hidden="true"/>
</div>

<style>
	.icon {
		display: inline-block;
		color: var(--green-color);
		font-size: 1.6rem;
		line-height: 2.3rem;
		text-align: center;
		padding: 0.2rem;
		border-radius: var(--border-radius);
		height: 2.5rem;
		width: 2.5rem;
	}
</style>
