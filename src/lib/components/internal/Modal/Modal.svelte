<script lang="ts">
	import { fade } from 'svelte/transition';

	export let open: boolean;
	export let handleClose: () => void;

	const handleEscapeClick = (event: KeyboardEvent) => {
		event.code === 'Escape' && handleClose();
	};
</script>

<svelte:window on:keydown={handleEscapeClick} />

{#if open}
	<div class="modal-root" class:open transition:fade={{ duration: 100 }}>
		<div
			class="backdrop"
			on:click={handleClose}
			on:keydown={() => undefined}
			role="button"
			tabindex="-1"
		/>

		<div class="modal-container">
			<div class="modal">
				<slot />
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.modal-root {
		position: fixed;
		z-index: 1300;
		inset: 0px;
		width: 100vw;
		height: 100vh;
		display: none;
		&.open {
			display: block;
		}

		.backdrop {
			background-color: rgba(0, 0, 0, 0.5);
			width: 100vw;
			height: 100vh;
			position: fixed;
		}
		.modal-container {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: grid;
			place-items: center;
			max-height: calc(100% - 6.4rem);
			overflow-y: auto;

			.modal {
				max-width: 60rem;
				background-color: var(--clr-surface-200);
				border-radius: var(--rounded-4);
				padding: var(--spacing-24);
				box-shadow: var(--shadow-md);
				display: flex;
				flex-direction: column;
			}
		}
	}
</style>
