<script lang="ts">
	export let classes: string = '';
</script>

<div class="video-wrapper">
	<iframe
		class={classes}
		width="100%"
		height="100%"
		src="https://youtube.com/embed/IW1vQAB6B18"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
		title="Tech Stream Conference Trailer"
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
	}
</style>
