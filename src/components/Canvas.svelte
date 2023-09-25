<script lang="ts">
  import { CanvasApplication } from '@utils/canvas/app';
  import { onMount } from 'svelte';

  let container: HTMLDivElement;
  onMount(() => {
    const app = CanvasApplication(container);
    container.appendChild(app.view);

    return () => {
      container.remove();
      app.destroy(true);
    };
  });
</script>

<div class=" h-[500px] w-[500px]" bind:this={container}></div>
