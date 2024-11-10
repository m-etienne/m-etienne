<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './../$types';
	import { toPlainText } from '@portabletext/svelte';
	import BlogCard from '../../components/landing/BlogCard.svelte';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: posts } = $q);
	$: param = '';
	let searchTerm = '';

	$: filteredPosts = $q.data.filter(post => {
			searchTerm = param || searchTerm.toLowerCase()

			let searchFilteredPosts = post.title?.toLowerCase().includes(searchTerm) 
			|| toPlainText(post.body).toLowerCase().includes(searchTerm) 
			|| post.excerpt?.toLowerCase().includes(searchTerm) 
		//	|| post.tag?.toString().toLowerCase().includes(searchTerm) 
		//	|| post.tag?.map(i => i.value.toString().toLocaleLowerCase().includes(searchTerm))

			return searchFilteredPosts
	})
</script>

<!-- START BLOG HEADER -->
<section id="home">
	<div class="container">
		<div class="input-group rounded mt-5 row input-center">
			<input 
				id="search" 
				type="search" 
				class="form-control rounded mt-5 mb-5" 
				placeholder="search" 
				aria-label="search" 
				aria-describedby="search-addon" bind:value={searchTerm}
			/>
		</div>
	</div>
</section>

<!-- START LIST OF POSTS -->
<section class="section bg-light" id="blog">
	<div class="container">
		<div class="row mt-5">
			{#if posts.length}
				{#each filteredPosts as post}
					<BlogCard {post} />
				{/each}
			{/if}
		</div>
	</div>
</section>

<style>
	#search {
		max-width: 700px;
	}

	.input-center {
		justify-content: center;
	}
</style>