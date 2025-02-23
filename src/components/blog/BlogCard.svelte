<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import type { Post } from '$lib/sanity/queries';
	import { base } from '$app/paths';

	export let post: Post;
	export let recommendedPost: Post;

	let currentPost = post;

	function handleClick() {
		currentPost = recommendedPost;
	}
</script>

<div class="col-lg-4 col-sm-6 mt-3">
	<a href={`${base}/blog/post/${recommendedPost.slug.current}`} on:click={handleClick}>
		<div class="card border-0 rounded p-2 h-100">
			<div class="card-header fw-bold">
				{recommendedPost.category}
				{#if recommendedPost.level}
					<span class={`level level-${recommendedPost.level[0].toLowerCase()}`}
						>{recommendedPost.level[0]}</span
					>
				{/if}
			</div>
			<div class="img_blog">
				{#if recommendedPost.mainImage}
					<img
						class="card__cover img-fluid rounded mx-auto d-block"
						src={urlFor(recommendedPost.mainImage).url()}
						alt="Cover image for {recommendedPost.title}"
					/>
				{:else}
					<div class="post__cover--none" />
				{/if}
			</div>
			<div class="content_blog p-3">
				<h5 class="fw-bold title">{recommendedPost.title}</h5>
				<p class="h6 text-muted date">
					{formatDate(recommendedPost.publishedAt ?? recommendedPost._createdAt)}
				</p>
				<div class="tags">
					{#if recommendedPost.tag}
						{#each recommendedPost.tag as tag}
							<span class="badge bg-secondary me-1">{tag.value}</span>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</a>
</div>

<style>
	.level {
		width: 25px;
		height: 25px;
		padding: 0.2rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.8rem;
		text-align: center;
		float: right;
	}

	.level-a {
		background-color: #cce5ff;
		color: #004085;
	}

	.level-b {
		background-color: #d4edda;
		color: #155724;
	}

	.level-i {
		background-color: #fff3cd;
		color: #856404;
	}

	.level-none {
		display: none;
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.title {
		height: 48px;
	}

	.tags,
	.date {
		margin-top: 1rem;
	}
</style>
