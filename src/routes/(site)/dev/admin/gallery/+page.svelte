<script lang="ts">
	import Button from '$lib/components/internal/Button/Button.svelte';
	import Body1 from '$lib/components/internal/typography/Body1.svelte';
	import { galleries } from '$lib/content/galleries';
	import type { PostReqResponse } from '../../../../api/v1/posts/constants';
	import type { PostEditorBody } from '../post/subcomponents/PostEditor/constants';
	import type { GalleryEditorBody } from './constants';

	export let data;

	// const { allCategories, allAuthors } = data;

	const handleCreateGallery = async (body: FormData): Promise<boolean> => {
		try {
			const res = await fetch('/api/v1/gallery', {
				method: 'POST',
				body,
			});

			const { status } = (await res.json()) as PostReqResponse;
			return status === 'success';
		} catch (error) {
			return false;
		}
	};

	let galleryTitle = '';
	let galleryDescription = '';
	let input: HTMLInputElement;
	let newImage: FileList;
	let errorText = '';

	const handleSubmit = async (event: MouseEvent) => {
		event.preventDefault();
		try {
			const formData = new FormData();

			const file = newImage?.[0];
			if (file) {
				const fileName = file.name;
				formData.append('newImage', file, fileName);
			}

			const body: GalleryEditorBody = {
				title: galleryTitle,
				description: galleryDescription,
				// categories: formCategories,

				// coverImage: formCoverImage,

				// date: postMetaData.date,
				// authors: formAuthors,
			};

			formData.append('data', JSON.stringify(body));

			const success = await handleCreateGallery(formData);

			if (!success) {
				errorText = 'Could not create post';
				return;
			}
		} catch (err) {
			errorText = 'Could not create post';
			console.warn(err);
		}
	};
</script>

<h2>Create a gallery</h2>


<input
	type="text"
	placeholder="Gallery Name"
	autocomplete="off"
	bind:value={galleryTitle}
	bind:this={input}
/>
<input
	type="text"
	placeholder="Description"
	autocomplete="off"
	bind:value={galleryDescription}
	bind:this={input}
/>
<label>
	<Body1>Cover Photo:</Body1>
	<input type="file" bind:files={newImage} />
</label>
<Button on:click={handleSubmit}>Create Gallery</Button>

<!-- <GalleryEditor handlePostAction={handleCreateGallery}/> -->

<!-- <PostEditor handlePostAction={handleCreatePost} {allCategories} {allAuthors} /> -->
