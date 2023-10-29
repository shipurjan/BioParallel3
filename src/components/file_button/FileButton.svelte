<script lang="ts">
  // Types
  import type { CssClasses } from '@skeletonlabs/skeleton/dist/index.js';
  import { open } from '@tauri-apps/api/dialog';

  //Props
  /**
   * Bind FileList to the file input.
   * @type {FileList}
   */
  export let files: FileList | undefined = undefined;
  /**
   * File input reference.
   */
  export let fileInput: HTMLInputElement | undefined = undefined;
  /**
   * Required. Set a unique name for the file input.
   * @type {string}
   */
  export let name: string;
  /**
   * Required. Extensions to filter, without a . prefix. (Example: ['svg', 'png'])
   * @type {string[]}
   */
  export let extensions: string[];
  /** Provide classes to set the width. */
  export let width: CssClasses = '';
  /** Provide a button variant or other class styles. */
  export let button: CssClasses = 'btn variant-filled';

  function onButtonClick(): void {
    if (fileInput) fileInput.click();
  }

  async function onFileInputClick(): Promise<void> {
    if (!fileInput) return;

    const fileResponse = await open({
      multiple: false,
      filters: [
        {
          name,
          extensions,
        },
      ],
    });
    if (fileResponse === null) return;

    const list = new DataTransfer();
    const filenames = Array.isArray(fileResponse)
      ? fileResponse
      : [fileResponse];

    filenames.forEach((filename) => {
      const file = new File(['content'], filename);
      list.items.add(file);
    });

    files = list.files;
    fileInput.files = list.files;

    const event = new Event('change', {
      bubbles: true,
      cancelable: false,
    });
    fileInput.dispatchEvent(event);
  }

  function prunedRestProps() {
    delete $$restProps['class'];
    return $$restProps;
  }

  // Reactive
  $: classesBase = `${$$props['class'] ?? ''}`;
  $: classesButton = `${button} ${width}`;
</script>

<div class="file-button {classesBase}" data-testid="file-button">
  <!-- NOTE: Don't use `hidden` as it prevents `required` from operating -->
  <div class="h-0 w-0 overflow-hidden">
    <input
      type="file"
      bind:this={fileInput}
      bind:files
      {name}
      {...prunedRestProps()}
      on:click|preventDefault={onFileInputClick}
      on:change
    />
  </div>
  <!-- Button -->
  <button
    type="button"
    class="file-button-btn {classesButton}"
    disabled={$$restProps['disabled']}
    on:click={onButtonClick}
    on:keydown
    on:keyup
    on:keypress
  >
    <slot>Select a File</slot>
  </button>
</div>
