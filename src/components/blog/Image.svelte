<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import { Col, Row } from '@sveltestrap/sveltestrap';

	export let portableText;
</script>

<Row class="d-flex justify-content-center">
	<Col lg="8">
		<div class="mt-3 post">
			{#if portableText.value}
				{#if portableText.value.link}
					<a href={portableText.value.link} target="_blank" rel="noopener noreferrer">
						<img
							class="img-fluid"
							src={urlFor(portableText.value).url()}
							alt={portableText.value.alt}
						/>
					</a>
				{:else}
					<img
						class="img-fluid"
						src={urlFor(portableText.value).url()}
						alt={portableText.value.alt}
					/>
				{/if}
			{:else}
				<div class="post__cover--none" />
			{/if}
		</div>
	</Col>
</Row>
