import componentTypes from "../componentTypes";
import {generateSprite, TILE_TYPES} from "../../utils/tileMap";

interface IProps {
  type: TILE_TYPES;
  x: number;
  y: number;
  width: number;
  height: number;
}

const spriteComponent = ({ x, y, type, width, height }: IProps) => {
  const _name = componentTypes.SPRITE;
  const _gr  = generateSprite(type);
  let _mounted = false;

  const getName = () => _name;

  const getGraphicsObject = () => _gr;

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

  setPosition({ x, y });
  _gr.width = width;
  _gr.height = height;

  return {
    getName,
    getGraphicsObject,
    setPosition,
    getPosition,
    isMounted,
    setMounted,
  }
}

export default spriteComponent;
