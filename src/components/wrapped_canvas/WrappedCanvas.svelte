<script lang="ts">
  import type { CanvasInstance } from '@/src/lib/stores/canvasInstancesStore';
  import Canvas from '@components/canvas/Canvas.svelte';
  import FileButton from '@components/file_button/FileButton.svelte';

  let files: FileList;
  export let spriteUrl: null | string = null;
  export let canvasInstance: CanvasInstance;

  function onChangeHandler() {
    const pathToSprite = files[0]?.name;
    if (pathToSprite) spriteUrl = pathToSprite;
  }
</script>

<div class="flex flex-col items-center gap-2">
  <Canvas {spriteUrl} {canvasInstance} />
  <FileButton
    button="btn variant-filled-primary"
    bind:files
    name="Image"
    extensions={['png', 'jpg', 'jpeg']}
    on:change={onChangeHandler}
  />
</div>
