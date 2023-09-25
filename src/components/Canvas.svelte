<script lang="ts">
  import * as PIXI from 'pixi.js';
  import { onMount } from 'svelte';

  let container: HTMLDivElement;
  onMount(() => {
    const app = new PIXI.Application<HTMLCanvasElement>({
      background: '#1099bb',
      resizeTo: container,
    });
    container.appendChild(app.view);
    return () => {
      container.remove();
      app.destroy(true);
    };
  });
</script>

<div class="h-[500px] w-[500px]" bind:this={container}></div>
