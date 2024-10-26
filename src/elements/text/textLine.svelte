<script lang="ts">
	export let classes: string = '';
	export let id :string = "";
</script>

<p {id} class="normal-font {classes}"><slot /></p>

<style>
	p {
		font-size: 1rem;
		line-height: 1.5rem;
		text-align: var(--text-align);
	}

	.white {
		color: var(--white-color);
	}
</style>
