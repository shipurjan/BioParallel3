<script lang="ts">
  import Canvas from '@components/canvas/Canvas.svelte';
  import FileButton from '@components/file_button/FileButton.svelte';

  let files: FileList;
  export let spriteUrl: null | string = null;

  function onChangeHandler() {
    const pathToSprite = files[0]?.name;
    console.log(pathToSprite);
    if (pathToSprite) spriteUrl = pathToSprite;
  }
</script>

<Canvas {spriteUrl} />
<FileButton
  bind:files
  name="Image"
  extensions={['png', 'jpg', 'jpeg']}
  on:change={onChangeHandler}
/>
