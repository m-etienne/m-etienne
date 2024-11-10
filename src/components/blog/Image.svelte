<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
  import { Col, Row } from "@sveltestrap/sveltestrap";

  export let portableText;
</script>

<Row class="d-flex justify-content-center">
  <Col lg="8">
      <div class="mt-3 post">
          {#if portableText.value}
          <img
            class="img-fluid"
            src={urlFor(portableText.value).url()}
            alt="{portableText.value.alt}"
          />
        {:else}
          <div class="post__cover--none" />
        {/if}
      </div>
  </Col>
</Row>