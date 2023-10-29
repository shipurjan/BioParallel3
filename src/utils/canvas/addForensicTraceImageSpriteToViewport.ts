import { addSprite } from '@utils/viewport/addSprite';
import { loadSprite } from '@utils/viewport/loadSprite';
import type { Viewport } from 'pixi-viewport';

export const addForensicTraceImageSpriteToViewport = (
  viewport: Viewport,
  spriteUrl: string | Uint8Array
) => {
  loadSprite(spriteUrl).then((sprite) => {
    const forensicTraceImageSpriteName = 'Forensic trace image';
    if (!viewport) return;

    const previousForensicTraceImageSpriteIndex = viewport.children.findIndex(
      (child) => child.name === forensicTraceImageSpriteName
    );

    if (previousForensicTraceImageSpriteIndex !== -1)
      viewport.removeChildAt(previousForensicTraceImageSpriteIndex);

    sprite.name = forensicTraceImageSpriteName;
    addSprite(viewport, sprite);
  });
};
