<script lang="ts">
	export let classes: string = '';
</script>

<p class="normal-font {classes}"><slot /></p>

<style>
	p {
		font-size: 1rem;
		line-height: 1.5rem;
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
