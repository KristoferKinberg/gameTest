import * as PIXI from "pixi.js";
import componentTypes from "../componentTypes";

const graphicsComponent = (
  x = 35,
  y = 35,
  r = 30,
  color = 0xffffff
) => {
  const gr  = new PIXI.Graphics();

  gr.beginFill(color);
  gr.drawCircle(x, y, r);
  gr.endFill();

  return {
    name: componentTypes.GRAPHICS,
    mounted: false,
    graphicsObj: gr,
  }
};

export default graphicsComponent;
