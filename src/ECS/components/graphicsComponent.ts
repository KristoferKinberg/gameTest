import * as PIXI from "pixi.js";
import componentTypes from "../componentTypes";
import {IRootComponent} from "../../types";

interface IPosition {
  x: number;
  y: number;
}

export interface IGraphicsComponent extends IRootComponent {
  isMounted: () => boolean;
  setMounted: (isMounted: boolean) => boolean;
  getPosition: () => {
    x: number;
    y: number;
  };
  setPosition: ({ x, y }: IPosition) => void;
  getGraphicsObject: () => PIXI.Graphics;
}

interface IProps {
  x?: number;
  y?: number;
  r?: number;
  color?: number;
  border?: {
    color: number;
    thickness: number;
  }
}

const graphicsComponent = (props?: IProps): IGraphicsComponent => {
  const _name = componentTypes.GRAPHICS;
  const _gr  = new PIXI.Graphics();
  const baseSettings = { x: 35, y: 35, r: 30, color: 0xffffff, border: false };
  let _mounted = false;

  const { x, y, r, color } = { ...baseSettings, ...props };

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
