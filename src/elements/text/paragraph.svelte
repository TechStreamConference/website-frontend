<script lang="ts">
	export let classes: string = '';
</script>

<p class="normal-font {classes}"><slot /></p>

<style>
	p {
		font-size: var(--full-font-size);
		line-height: var(--full-line-height);
		text-wrap: wrap;
		text-align: var(--text-align);
		width: var(--width);
	}

	.white {
		color: var(--white-color);
	}

	.pre-wrap {
		white-space: pre-wrap;
	}
</style>
