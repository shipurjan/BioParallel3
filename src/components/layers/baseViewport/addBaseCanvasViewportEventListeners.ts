import { canvasInstances } from '@/src/lib/stores/canvasInstancesStore';
import type { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';

export const addBaseCanvasViewportEventListeners = (
  id: string,
  baseViewport: Viewport,
  markersViewport: Viewport
) => {
  let startX: number;
  let startY: number;
  baseViewport.addEventListener('mousedown', function (event) {
    startX = event.pageX;
    startY = event.pageY;
  });

  baseViewport.addEventListener('mouseup', function (event) {
    if (event.button !== 0) return;

    const diffX = Math.abs(event.pageX - startX);
    const diffY = Math.abs(event.pageY - startY);
    const DELTA = 2;

    if (diffX < DELTA && diffY < DELTA) {
      addMarker(event);
    }
  });

  baseViewport.addEventListener('moved', () => {
    checkBorderRestrictions();
    markersViewport.position = baseViewport.position;

    canvasInstances.update((previous) => {
      return previous.map((props) =>
        props.id !== id
          ? props
          : {
              ...props,
              markersViewport,
            }
      );
    });
  });

  let previousScaled = 1.0;
  baseViewport.addEventListener('zoomed', () => {
    markersViewport.children.forEach((mark) => {
      mark.position.x *= baseViewport.scaled / previousScaled;
      mark.position.y *= baseViewport.scaled / previousScaled;
    });
    previousScaled = baseViewport.scaled;

    canvasInstances.update((previous) => {
      return previous.map((props) =>
        props.id !== id
          ? props
          : {
              ...props,
              markersViewport,
            }
      );
    });
  });

  function addMarker(event: PIXI.FederatedPointerEvent) {
    const normalizedX = event.screenX - baseViewport.x;
    const normalizedY = event.screenY - baseViewport.y;
    const clickedOnViewportWorld =
      normalizedX >= 0 &&
      normalizedY >= 0 &&
      normalizedX <= baseViewport.width &&
      normalizedY <= baseViewport.height;

    if (!clickedOnViewportWorld) return;

    const frame = new PIXI.Graphics();
    frame.beginFill(0xff0000);
    frame.drawCircle(0, 0, 3);
    frame.position.set(normalizedX, normalizedY);
    markersViewport.addChild(frame);

    canvasInstances.update((previous) => {
      return previous.map((props) =>
        props.id !== id
          ? props
          : {
              ...props,
              markersViewport,
            }
      );
    });
  }

  function checkBorderRestrictions() {
    if (baseViewport.scaled > 1) {
      // Top border is touched
      if (baseViewport.top < 0) baseViewport.moveCorner(baseViewport.left, 0);

      // Bottom border is touched
      if (baseViewport.bottom > baseViewport.screenHeight)
        baseViewport.moveCorner(
          baseViewport.left,
          -(baseViewport.screenHeightInWorldPixels - baseViewport.screenHeight)
        );

      // Left border is touched
      if (baseViewport.left < 0) baseViewport.moveCorner(0, baseViewport.top);

      // Right border is touched
      if (baseViewport.right > baseViewport.screenWidth)
        baseViewport.moveCorner(
          -(baseViewport.screenWidthInWorldPixels - baseViewport.screenWidth),
          baseViewport.top
        );
      return;
    }

    // Top border is touched
    if (baseViewport.top > 0) baseViewport.moveCorner(baseViewport.left, 0);

    // Bottom border is touched
    if (baseViewport.bottom < baseViewport.screenHeight)
      baseViewport.moveCorner(
        baseViewport.left,
        -(baseViewport.screenHeightInWorldPixels - baseViewport.screenHeight)
      );

    // Left border is touched
    if (baseViewport.left > 0) baseViewport.moveCorner(0, baseViewport.top);

    // Right border is touched
    if (baseViewport.right < baseViewport.screenWidth)
      baseViewport.moveCorner(
        -(baseViewport.screenWidthInWorldPixels - baseViewport.screenWidth),
        baseViewport.top
      );
  }
};
