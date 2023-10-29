import { loadSprite } from '@utils/viewport/loadSprite';
import type { Viewport } from 'pixi-viewport';

export const addForensicTraceImageSpriteToViewport = (
  viewport: Viewport,
  spriteUrl: string
) => {
  loadSprite(spriteUrl).then((sprite) => {
    const forensicTraceImageSpriteName = 'Forensic trace image';

    if (!sprite) return;
    const previousForensicTraceImageSpriteIndex = viewport.children.findIndex(
      (child) => child.name === forensicTraceImageSpriteName
    );
    if (previousForensicTraceImageSpriteIndex !== -1)
      viewport.removeChildAt(previousForensicTraceImageSpriteIndex);

    sprite.name = forensicTraceImageSpriteName;
    viewport.addChild(sprite);
  });
};
