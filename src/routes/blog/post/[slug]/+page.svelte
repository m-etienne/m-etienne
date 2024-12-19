<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import { Col, Container, Row } from '@sveltestrap/sveltestrap';
	import type { PageData } from './$types';
	import Quiz from '../../../../components/quiz/Quiz.svelte';
	import BlogCard from '../../../../components/blog/BlogCard.svelte';
	import Image from '../../../../components/blog/Image.svelte';
	import Code from '../../../../components/blog/Code.svelte';

	export let data: PageData;
	$: q = useQuery(data);

	$: ({ data: post } = $q);
</script>

<section class="section" id="home">
	<Container>
		<Row class="d-flex justify-content-center">
			<Col lg="8">
				<div class="mt-3 post">
					{#if post.mainImage}
						<img
							class="img-fluid"
							src={urlFor(post.mainImage).url()}
							alt="Cover image for {post.title}"
						/>
					{:else}
						<div class="post__cover--none" />
					{/if}
				</div>
			</Col>
		</Row>
		<Row class="d-flex justify-content-center">
			<Col lg="8">
				<div class="mt-3">
					<h1 class="mt-4"><span class="fw-bold">{post.title}</span></h1>
					<p class="text-muted mt-2">
						{formatDate(post.publishedAt ?? post._createdAt)}
					</p>
					<!-- <p>
								{#if post.tag?.length}
									{#each post.tag as tag}
										<button class="tag btn btn-primary"><a href=''>{tag.value} </a> </button>
									{/each}
								{/if}
							</p>					 -->
					{#if post.body}
						<div>
							<!-- Unfortunately for some reason I haven't sus'd out yet, 
									I need both value and portableText props -->
							<PortableText
								components={{ types: { image: Image, code: Code } }}
								value={post.body}
								portableText={post.body}
							/>
						</div>
					{/if}
				</div>
			</Col>
		</Row>
	</Container>
</section>

{#if post.quiz}
	<section class="section bg-body-secondary" id="quiz">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-8">
					<div class="text-center">
						<h2><span class="fw-bold">Quiz</span></h2>
						<Quiz {post} />
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}

{#if post.recommendedPost}
	<section class="section bg-light" id="recommended-posts">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-12">
					<div class="text-center">
						<h2><span class="fw-bold">Recommended Posts</span></h2>
					</div>
					<div class="row mt-5 card-deck">
						{#each post.recommendedPost as recommendedPost}
							<BlogCard {recommendedPost} bind:post />
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}
