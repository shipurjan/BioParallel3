import { createCanvasApp } from '@components/layers/app/createCanvasApp';
import type { Viewport } from 'pixi-viewport';
import type { Application } from 'pixi.js';
import { writable } from 'svelte/store';

export type CanvasInstance = {
  id: string;
  app: Application<HTMLCanvasElement>;
  baseViewport: Viewport | null;
  markersViewport: Viewport | null;
};

const createCanvasInstance = (): CanvasInstance => {
  const id = crypto.randomUUID();
  const app = createCanvasApp();

  return {
    id,
    baseViewport: null,
    markersViewport: null,
    app,
  };
};

export const canvasInstances = writable<CanvasInstance[]>(
  // Populate the store with 2 CanvasInstances
  Array(2)
    .fill(undefined)
    .map(() => createCanvasInstance())
);
