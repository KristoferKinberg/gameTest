import * as PIXI from 'pixi.js';

const food = () => {
  const gr = new PIXI.Graphics();

  gr.beginFill(0xff0000);
  gr.drawCircle(5, 5, 5);
  gr.endFill();

  return gr;
}

export default food;
