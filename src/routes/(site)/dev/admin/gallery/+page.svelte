<script lang="ts">
	import Button from '$lib/components/internal/Button/Button.svelte';
	import { galleries } from '$lib/content/galleries';
	import type { PostReqResponse } from '../../../../api/v1/posts/constants';

	export let data;

	// const { allCategories, allAuthors } = data;

	const handleCreateGallery = async (body: FormData): Promise<boolean> => {
		try {
			const res = await fetch('/api/v1/gallery', {
				method: 'POST',
				body: JSON.stringify({ galleryName, galleryDescription }),
			});

			const { status } = (await res.json()) as PostReqResponse;

			return status === 'success';
		} catch (error) {
			return false;
		}
	};

	let galleryName = '';
	let galleryDescription = '';
	let input: HTMLInputElement;
</script>

<h2>Create a gallery</h2>

<Button on:click={handleCreateGallery}>Gallery Title</Button>
<input type="text" autocomplete="off" bind:value={galleryName} bind:this={input} />
<input type="text" autocomplete="off" bind:value={galleryDescription} bind:this={input} />
<!-- <GalleryEditor handlePostAction={handleCreateGallery}/> -->

<!-- <PostEditor handlePostAction={handleCreatePost} {allCategories} {allAuthors} /> -->
