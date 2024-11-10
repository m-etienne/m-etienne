<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import type { Post } from '$lib/sanity/queries';

	export let recommendedPost: Post;
	export let post: Post;
</script>

<div class="col-lg-4 col-sm-6 mt-3">
	<a href={`/blog/post/${recommendedPost.slug.current}`} on:click={() => (post = recommendedPost)}>
		<div class="card border-0 rounded p-2 h-100">
			<div class="img_blog">
				{#if recommendedPost.mainImage}
					<img
						class="card__cover img-fluid rounded mx-auto d-block"
						src={urlFor(recommendedPost.mainImage).url()}
						alt="Cover image for {recommendedPost.title}"
					/>
				{:else}
					<div class="recommendedPost__cover--none" />
				{/if}
			</div>
			<div class="content_blog p-3">
				<div>
					<h5 class="fw-bold mb-0">{recommendedPost.title}</h5>
				</div>
				<div class="mt-3">
					<p class="h6 text-muted date_blog mb-0">{formatDate(recommendedPost._createdAt)}</p>
					<p class="mt-3 desc_blog text-muted">{recommendedPost.excerpt}</p>
				</div>
			</div>
		</div>
	</a>
</div>
