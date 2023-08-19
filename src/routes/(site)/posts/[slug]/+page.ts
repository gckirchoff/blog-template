import { error, redirect } from '@sveltejs/kit';

import type Post from '$lib/types/post.js';

export const prerender = true;

export const load = async ({ params }) => {
	// /posts/page will be covered by another route
	if (params.slug == 'page') {
		throw redirect(301, '/posts');
	}
	try {
		const post = await import(`../../../../lib/content/posts/${params.slug}.md`);

		return {
			PostContent: post.default,
			meta: { ...(post.metadata as Post), slug: params.slug },
		};
	} catch (err) {
		throw error(404, `Could not find ${params.slug}`);
	}
};
