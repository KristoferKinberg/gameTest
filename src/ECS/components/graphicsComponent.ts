import * as PIXI from "pixi.js";
import componentTypes from "../componentTypes";

const graphicsComponent = (
  x = 35,
  y = 35,
  r = 30,
  color = 0xffffff
) => {
  const _name = componentTypes.GRAPHICS;
  const _gr  = new PIXI.Graphics();
  let _mounted = false;

  _gr.beginFill(color);
  _gr.drawCircle(x, y, r);
  _gr.endFill();

  const getName = () => _name;

  const isMounted = () => _mounted;

  const setMounted = (isMounted: boolean) => _mounted = isMounted;

  const getPosition = () => ({
    x: _gr.position.x,
    y: _gr.position.y,
  });

  const setPosition = ({ x, y }: { x?: number, y?: number } = {}) => {
    if (x) _gr.position.x = x;
    if (y) _gr.position.y = y;
  };

  const getGraphicsObject = () => _gr;

  return {
    getName,
    isMounted,
    setMounted,
    getPosition,
    setPosition,
    getGraphicsObject,
  }
};

export default graphicsComponent;
