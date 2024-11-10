<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';

	import Header from '../components/landing/Header.svelte'
	import About from '../components/landing/About.svelte'
	import Blog from '../components/landing/Blog.svelte';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: mostRecentPosts } = $q);
</script>

<!-- START HEADER -->
<Header />

<!-- START ABOUT -->
<About />

<!-- START BLOG -->
<Blog {mostRecentPosts}/>