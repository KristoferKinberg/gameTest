import * as PIXI from "pixi.js";

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
    name: 'graphics',
    mounted: false,
    graphicsObj: gr,
  }
};

export default graphicsComponent;
