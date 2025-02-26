import { setPreviewing } from '@sanity/visual-editing/svelte';
import type { LayoutLoad } from './$types';

// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;

export const load: LayoutLoad = (event) => {
	// The `event.data.preview` value received here is exposed by the
	// corresponding `+layout.server.ts` file.
	const { preview } = event.data;
	// `@sanity/visual-editing/svelte` exports two helpers for setting and getting
	// preview state on the client: `setPreviewing` and `isPreviewing`.
	setPreviewing(preview);
};
