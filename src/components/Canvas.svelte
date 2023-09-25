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
  });
</script>

<div class="h-[500px] w-[500px]" bind:this={container}></div>
