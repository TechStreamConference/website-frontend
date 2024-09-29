<script lang="ts">
	export let title: string;
	export let id: string;
</script>

<div class="video-wrapper">
	<iframe
		width="100%"
		height="100%"
		src="https://www.youtube.com/embed/{id}"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
		{title}
	/>
</div>

<style>
	.video-wrapper {
		position: relative;
		height: 0;
		padding-bottom: 56.25%;
	}

	.video-wrapper iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: var(--border-radius);
	}
</style>
