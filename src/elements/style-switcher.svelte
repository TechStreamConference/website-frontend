<script>
	const light_c = 'light-mode';
	const dark_c = 'dark-mode';
	const theme_c = 'theme';

	function switchTheme(switch_ = true) {
		let theme = localStorage.getItem(theme_c);

		if (!theme) {
			theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? dark_c : light_c;
			localStorage.setItem(theme_c, theme);
		}

		window.document.documentElement.classList.remove(theme);

		if (switch_) {
			theme = theme === dark_c ? light_c : dark_c;
			localStorage.setItem(theme_c, theme);
		}
		window.document.documentElement.classList.add(theme);
	}

    export function initialStyle(){
        switchTheme(false);
    }
</script>

<button
	on:click={() => {
		switchTheme();
	}}
>
	toggle
</button>

<style>
    button {
		background-color: #f76027;
		color: white;
		border: none;
		border-radius: 4px;
		padding: 0.5rem;
		text-transform: uppercase;
	}

    :global(body.dark-mode) button {
		background-color: #0084f6;
		color: white;
	}
</style>
