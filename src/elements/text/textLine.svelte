<script lang="ts">
	export let classes: string = '';
	export let id :string = "";
</script>

<p {id} class="normal-font {classes}"><slot /></p>

<style>
	p {
		font-size: var(--full-font-size);
		line-height: var(--full-line-height);
		text-align: var(--text-align);
	}

	.white {
		color: var(--white-color);
	}
</style>
