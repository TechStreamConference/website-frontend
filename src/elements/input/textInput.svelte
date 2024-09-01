<script>
	export let placeholderText = '';
    export let value = "";
</script>

<input type="text" name="input" placeholder={placeholderText} on:input bind:value />
