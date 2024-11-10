import { mostRecentPostsQuery as query, type Post } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const initial = await loadQuery<Post[]>(query);

	if (!initial) {
		error(404, {
			message: 'Not found'
		});
	}

	// We pass the data in a format that is easy for `useQuery` to consume in the
	// corresponding `+page.svelte` file, but you can return the data in any
	// format you like.
	return {
		query,
		options: { initial }
	};
};