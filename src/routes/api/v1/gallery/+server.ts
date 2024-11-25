import { error, json } from '@sveltejs/kit';
import { writeFile, mkdir } from 'node:fs/promises';

import { fetchGalleries } from '$lib/utils/fetchGalleries';
import { galleries } from '$lib/content/galleries/index.js';
import { slugify } from '$lib/utils/logic.js';
import type { GalleryReqPostBody } from './constants.js';
import { processContentImages, processGalleryImages, uploadAndGetGalleryCoverImage } from '../../utils.js';

export const GET = async (): Promise<Response> => {
	const galleries = fetchGalleries();
	return json(galleries);
};

export const POST = async ({ request }) => {

	try {
		const formData = await request.formData();
		const body = JSON.parse(formData.get('data') as string) as GalleryReqPostBody;
		const { coverImage: image } = body;

		const newImageFile = formData.get('newImage') as Blob | null;
		const slug = slugify(body.title) //add patch req change later
		const coverImage = await uploadAndGetGalleryCoverImage(image, slug, newImageFile);

		const { title, description } = body

		console.log('body', body, newImageFile)
		// const allGallerySlugs = galleries.map((gal) => gal.slug)
		const fileName = slugify(title)
		const jsonData = {
			title,
			description,
			coverImage
		}

		await processGalleryImages(
			coverImage,
			fileName,
		);

		const filePath = `src/lib/content/galleries/${fileName}`;
		const jsonFilePath = `src/lib/content/galleries/${fileName}/${title}.json`

		await mkdir(filePath, { recursive: true });
		await writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));

		return json({
			status: 'success',
			message: `Files created in ${filePath}`
		});
	} catch (err) {
		console.warn(err);
		error(500, 'Internal server error');
	}
}
