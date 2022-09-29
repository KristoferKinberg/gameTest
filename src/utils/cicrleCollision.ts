import * as PIXI from "pixi.js";

/**
 * Get object center cords
 * @param obj
 */
const getObjectCenterCords = (obj: PIXI.Graphics) => {
  const { x, y, width } = obj.getBounds();
  return {
    x: x + (width / 2),
    y: y + (width / 2)
  }
}

/**
 * Get distance between points
 * @param x1
 * @param x2
 * @param y1
 * @param y2
 */
const getDistanceBetweenPoints = (x1: number, x2: number, y1: number, y2: number) => {
  const x = x1 - x2;
  const y = y1 - y2;
  const sqrRoot = (x*x) + (y*y);

  return Math.sqrt(sqrRoot);
};

/**
 * Did collide
 * @param obj1
 * @param obj2
 */
const didCollide = (obj1: PIXI.Graphics, obj2: PIXI.Graphics) => {
  const { x: obj1x, y: obj1y } = getObjectCenterCords(obj1);
  const { x: obj2x, y: obj2y } = getObjectCenterCords(obj2);

  const distance = getDistanceBetweenPoints(obj1x, obj2x, obj1y, obj2y);
  const maxPossibleDistance = (obj1.width / 2) + (obj2.width / 2);

  return maxPossibleDistance > distance;
}

export default didCollide;
