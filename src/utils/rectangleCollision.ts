import * as PIXI from "pixi.js";

type GraphicsType = PIXI.Graphics | PIXI.Sprite;

/**
 * Did collide
 * @param obj1
 * @param obj2
 */
export const didCollide = (obj1: GraphicsType, obj2: GraphicsType) => {
  const { x: x1, y: y1, width: w1, height: h1 } = obj1.getBounds();
  const { x: x2, y: y2, width: w2, height: h2 } = obj2.getBounds();

  return x1 < x2 + w2 &&
  x1 + w1 > x2 &&
  y1 < y2 + h2 &&
  h1 + y1 > y2
}
