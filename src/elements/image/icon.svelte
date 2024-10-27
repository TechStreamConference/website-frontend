<script lang="ts">
	import '@fortawesome/fontawesome-free/css/all.min.css';

	export let type: string;

	import { iconLookup } from 'lookup/iconLookup';
</script>

<div class="icon">
	<i class="fa {iconLookup(type)}" aria-hidden="true" />
</div>

<style>
    .icon {
        display: inline-block;
        color: var(--secondary-color);
        font-size: var(--1-5x-font-size);
        line-height: var(--1-5x-line-height);
        text-align: center;
        padding: var(--quad-padding);
        border-radius: var(--border-radius);
        height: 2.5rem;
        width: 2.5rem;
    }
</style>
