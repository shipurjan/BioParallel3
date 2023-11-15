<script lang="ts">
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import type { DisplayObject } from 'pixi.js';

  export let markerList: DisplayObject[] = [];
  export let selectedMarker: string;
</script>

<div class="card text-token w-48 p-4">
  <ListBox spacing="space-y-0">
    {#each markerList as _marker, index}
      <ListBoxItem
        bind:group={selectedMarker}
        name="leftSideCanvasMarkerList"
        value={String(index)}>{index} Point</ListBoxItem
      >
    {/each}
  </ListBox>
</div>
