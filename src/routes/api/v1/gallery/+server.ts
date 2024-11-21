import { error, json } from '@sveltejs/kit';
import { writeFile, mkdir } from 'node:fs/promises';

import { fetchGalleries } from '$lib/utils/fetchGalleries';
import { galleries } from '$lib/content/galleries/index.js';
import { slugify } from '$lib/utils/logic.js';

export const GET = async (): Promise<Response> => {
	const galleries = fetchGalleries();
	return json(galleries);
};

export const POST = async ({ request }) => {

	try {
		const { galleryName, galleryDescription } = await request.json();
		const allGallerySlugs = galleries.map((gal) => gal.slug)
		const galleryNameSlug = slugify(galleryName)
		console.log('galleryName', galleryName, galleryDescription)

		const dirPath = `src/lib/content/galleries/${galleryNameSlug}`;
		const jsonFilePath = `src/lib/content/galleries/${galleryNameSlug}/${galleryName}.json`

		const jsonData = {
			title: galleryName,
			description: galleryDescription
		}

		// galleries.push({
		// 	title: galleryName,
		// 	slug: galleryNameSlug,
		// 	excerpt: "the excerpt",
		// 	description: 'This is the description',
		// 	photos: []
		// })

		await mkdir(dirPath, { recursive: true });
		await writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));

		return json({
			status: 'success',
			message: `Files created in ${dirPath}`
		});
	} catch (err) {
		console.warn(err);
		error(500, 'Internal server error');
	}
}
