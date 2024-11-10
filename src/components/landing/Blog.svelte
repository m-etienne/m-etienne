<script>
	import { base } from '$app/paths';
	import BlogCard from './BlogCard.svelte';

	export let mostRecentPosts;
</script>

<section class="section bg-light" id="blog">
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-12">
				<div class="text-center">
					<h2><span class="fw-bold">Blog</span></h2>
				</div>
			</div>
		</div>
		<div class="row mt-5">
			{#each mostRecentPosts as post}
				<BlogCard {post} />
			{/each}
		</div>
		<div class="text-center mt-4">
			<a href="{base}/blog" class="btn btn-primary mt-5">More</a>
		</div>
	</div>
</section>
