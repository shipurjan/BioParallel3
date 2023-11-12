<script lang="ts">
  import { spring } from 'svelte/motion';

  import type { Application } from 'pixi.js';
  import type { Viewport } from 'pixi-viewport';
  import { CanvasApplication } from '@controllers/canvas/canvas';
  import { onMount } from 'svelte';
  import { CanvasViewport } from '@controllers/viewport/viewport';
  import { getDroppedFileData } from '@utils/canvas/getDroppedFileData';
  import DebugInfo from './DebugInfo/DebugInfo.svelte';
  import { addForensicTraceImageSpriteToViewport } from '@utils/canvas/addForensicTraceImageSpriteToViewport';

  export let spriteUrl: null | string = null;
  let container: HTMLDivElement;
  let app: Application<HTMLCanvasElement>;
  let viewport: Viewport;
  const blurSpring = spring(0, { stiffness: 0.2, damping: 0.8 });
  const colorSpring = spring(0, { stiffness: 0.2, damping: 0.8 });
  const toggleTransform = () => {
    blurSpring.update((val) => (val === 0 ? 1 : 0));
    return colorSpring.update((val) => (val === 0 ? 0.5 : 0));
  };

  $: if (spriteUrl !== null) {
    addForensicTraceImageSpriteToViewport(viewport, spriteUrl);
  }

  // pos is cursor position when right click occur
  let pos = { x: 0, y: 0 };
  // menu is dimension (height and width) of context menu
  let menu = { w: 0, h: 0 };
  // browser/window dimension (height and width)
  let browser = { w: 0, h: 0 };
  // showMenu is state of context-menu visibility
  let showMenu = false;

  function rightClickContextMenu(
    e: MouseEvent & {
      currentTarget: EventTarget & HTMLDivElement;
    }
  ) {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();

    browser = {
      w: container.clientWidth,
      h: container.clientHeight,
    };
    pos = {
      x: e.pageX - window.scrollX - currentTargetRect.left,
      y: e.pageY - window.scrollY - currentTargetRect.top,
    };
    // If bottom part of context menu will be displayed
    // after right-click, then change the position of the
    // context menu. This position is controlled by `top` and `left`
    // at inline style.
    // Instead of context menu is displayed from top left of cursor position
    // when right-click occur, it will be displayed from bottom left.
    if (browser.h - pos.y < menu.h) pos.y = pos.y - menu.h;
    if (browser.w - pos.x < menu.w) pos.x = pos.x - menu.w;

    showMenu = true;
  }

  function onPageClick() {
    showMenu = false;
  }

  function getContextMenuDimension(node: HTMLElement) {
    // This function will get context menu dimension
    // when navigation is shown => showMenu = true
    let height = node.offsetHeight;
    let width = node.offsetWidth;
    menu = {
      h: height,
      w: width,
    };
  }
  function addItem() {
    console.log('asda');
  }
  function print() {
    console.log('asda');
  }
  function zoom() {
    console.log('asda');
  }
  function remove() {
    console.log('asda');
  }
  function setting() {
    console.log('asda');
  }
  let menuItems = [
    {
      name: 'addItem',
      onClick: addItem,
      displayText: 'Add Item',
      class: 'fa-solid fa-plus',
    },
    {
      name: 'emptyicons',
      onClick: addItem,
      displayText: 'Empty Icon',
      class: 'fa-solid fa-square',
    },
    {
      name: 'zoom',
      onClick: zoom,
      displayText: 'Zoom',
      class: 'fa-solid fa-magnifying-glass',
    },
    {
      name: 'printMenu',
      onClick: print,
      displayText: 'Print',
      class: 'fa-solid fa-print',
    },
    {
      name: 'hr',
    },
    {
      name: 'settings',
      onClick: setting,
      displayText: 'Settings',
      class: 'fa-solid fa-gear',
    },
    {
      name: 'hr',
    },
    {
      name: 'trash',
      onClick: remove,
      displayText: 'Trash',
      class: 'fa-solid fa-trash-can',
    },
  ];

  onMount(() => {
    app = CanvasApplication(container);
    viewport = CanvasViewport(app);

    return () => {
      container.remove();
      viewport.destroy();
      app.destroy(true);
    };
  });
</script>

<div class="flex w-[500px] flex-col outline outline-2">
  {#if import.meta.env.DEV && app && viewport}
    <DebugInfo
      {app}
      {viewport}
      class="box-border grid w-full grid-cols-[fit-content(0px),auto] gap-[1px] bg-surface-900 p-2 text-center text-[0.6rem] text-tertiary-50"
    />
  {/if}

  <div
    style="filter: blur({$blurSpring}px) sepia({$colorSpring}) grayscale({$colorSpring})"
    class=" h-[500px] w-full"
    bind:this={container}
    role="presentation"
    on:dragenter|preventDefault={toggleTransform}
    on:dragleave|preventDefault={toggleTransform}
    on:contextmenu|preventDefault={rightClickContextMenu}
    on:click|preventDefault={onPageClick}
    on:drop|preventDefault={(event) => {
      toggleTransform();
      getDroppedFileData(event).then((imageData) => {
        addForensicTraceImageSpriteToViewport(viewport, imageData);
      });
    }}
  >
    {#if showMenu}
      <nav
        use:getContextMenuDimension
        style="position: absolute; top:{pos.y}px; left:{pos.x}px"
      >
        <div class="navbar" id="navbar">
          <ul>
            {#each menuItems as item}
              {#if item.name == 'hr'}
                <hr />
              {:else}
                <li>
                  <button on:click={item.onClick}
                    ><i class={item.class}></i>{item.displayText}</button
                  >
                </li>
              {/if}
            {/each}
          </ul>
        </div>
      </nav>
    {/if}
  </div>
</div>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .navbar {
    display: inline-flex;
    border: 1px #999 solid;
    width: 170px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    flex-direction: column;
  }
  .navbar ul {
    margin: 6px;
  }
  ul li {
    display: block;
    list-style-type: none;
    width: 1fr;
  }
  ul li button {
    font-size: 1rem;
    color: #222;
    width: 100%;
    height: 30px;
    text-align: left;
    border: 0px;
    background-color: #fff;
  }
  ul li button:hover {
    color: #000;
    text-align: left;
    border-radius: 5px;
    background-color: #eee;
  }
  ul li button i {
    padding: 0px 15px 0px 10px;
  }
  ul li button i.fa-square {
    color: #fff;
  }
  ul li button:hover > i.fa-square {
    color: #eee;
  }
  ul li button:hover > i.warning {
    color: crimson;
  }
  :global(ul li button.info:hover) {
    color: navy;
  }
  hr {
    border: none;
    border-bottom: 1px solid #ccc;
    margin: 5px 0px;
  }
</style>
