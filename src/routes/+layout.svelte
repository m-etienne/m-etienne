<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import LiveMode from '../layouts/LiveMode.svelte';

	import NavbarCustom from '../layouts/NavbarCustom.svelte';
	import Footer from '../layouts/Footer.svelte';
	import Settings from '../layouts/Settings.svelte';

	// import code syntax highlighting
	import atomOneDark from 'svelte-highlight/styles/atom-one-dark';

	// import 'assets/css/bootstrap.min.css'
	// import 'bootstrap/dist/js/bootstrap.js';
</script>

<svelte:head>
	<link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
	<link rel="stylesheet" href="/assets/css/materialdesignicons.min.css" />

	<!-- Animate Css -->
	<link rel="stylesheet" type="text/css" href="/assets/css/animate.min.css" />

	<!-- Magnific-popup -->
	<link rel="stylesheet" type="text/css" href="/assets/css/magnific-popup.css" />

	<!-- Mobirise icons Css -->
	<link rel="stylesheet" type="text/css" href="/assets/css/mobiriseicons.css" />

	<link rel="stylesheet" href="/assets/css/style.css" />

	{@html atomOneDark}
</svelte:head>

{#if $isPreviewing}
	<a href={`/preview/disable?redirect=${$page.url.pathname}`} class="preview-toggle">
		<span>Preview Enabled</span>
		<span>Disable Preview</span>
	</a>
{/if}

<!-- Loader -->
<!-- <Loader/> -->

<!-- Start Navbar -->
<NavbarCustom />

<!-- START HOME & ABOUT-->
<slot />

<!--START FOOTER-->
<Footer />

<!-- SETTINGS -->
<Settings />

{#if $isPreviewing}
	<VisualEditing />
	<LiveMode />
{/if}
