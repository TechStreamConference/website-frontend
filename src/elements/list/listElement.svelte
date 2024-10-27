<script lang="ts">
	export let classes: string = '';
</script>

<li class="normal-font {classes}">
	<slot />
</li>

<style>
	li {
		list-style-type: none;
	}

	.dot {
		list-style-type: disc;
	}
</style>
