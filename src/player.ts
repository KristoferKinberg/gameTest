import * as PIXI from 'pixi.js'

const player = (x = 35, y = 35, r = 30, color = 0xffffff) => {
  const gr  = new PIXI.Graphics();

  gr.beginFill(color);
  gr.drawCircle(x, y, r);
  gr.endFill();

  return gr;
}

export default player;
