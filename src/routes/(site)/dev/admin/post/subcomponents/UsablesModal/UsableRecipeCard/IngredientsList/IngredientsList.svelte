<script lang="ts">
	import Button from '$lib/components/internal/Button/Button.svelte';
	import { H5 } from '$lib/components/internal/typography';
	import type { Ingredient, IngredientSection } from '$lib/components/usables/RecipeCard/types';

	export let ingredientsSection: IngredientSection;
	export let onSubmit: (section: string, newIngredient: Ingredient) => void;

	let newIngredient = '';
	let quantity = 0;
	let unit = '';
	let note = '';

	const addIngredient = () => {
		onSubmit(ingredientsSection.title, {
			item: newIngredient,
			quantity,
			unit,
			note,
		});
		newIngredient = '';
		quantity = 0;
		unit = '';
		note = '';
	};

	$: console.log('quantity',quantity)
</script>

<div class="container">
	<form on:submit={addIngredient}>
		<H5>{ingredientsSection.title}</H5>
		<input placeholder="New Ingredient" bind:value={newIngredient} />
		<input placeholder="Quantity" type="number" step="0.01" min="0" bind:value={quantity} on:input={({target}) => {console.log('changing!', target.value)}} />
		<input placeholder="Unit" type="text" bind:value={unit} />
		<input placeholder="Note (optional)" bind:value={note} />
		<Button type="submit">Add Ingredient</Button>
	</form>
	<ul>
		{#each ingredientsSection.list as { quantity, unit, item, note }}
			<li>{quantity} {unit} {item}. {note}</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.container {
		--indent: var(--spacing-24);

		padding-left: var(--indent);

		ul {
			padding-left: var(--indent);
		}
	}
</style>
