<script lang="ts">
	export let classes: string = '';
</script>

<p class="normal-font {classes}"><slot /></p>

<style>
	p {
		font-size: var(--full-font-size);
		line-height: var(--full-line-height);
		text-align: var(--text-align);
	}

	.text-line-white {
		color: var(--white-color);
	}

	.text-line-black {
		color: var(--black-color);
	}
</style>
