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

export enum SupportedShapes {
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle'
}

interface IProps {
  x?: number;
  y?: number;
  r?: number;
  width?: number;
  height?: number;
  color?: number;
  shape?: string;
  border?: {
    color: number;
    thickness: number;
  }
}

const graphicsComponent = (props?: IProps): IGraphicsComponent => {
  const _name = componentTypes.GRAPHICS;
  const _gr  = new PIXI.Graphics();
  const baseSettings = {
    x: 35,
    y: 35,
    r: 30,
    width: 40,
    height: 20,
    color: 0xffffff,
    border: false,
    shape: SupportedShapes.CIRCLE
  };
  let _mounted = false;

  const { x, y, r, color, shape, width, height, } = { ...baseSettings, ...props };
  _gr.zIndex = 10;

  const shapeGenerator = () => {
    if (shape === SupportedShapes.CIRCLE) _gr.drawCircle(x, y, r);
    if (shape === SupportedShapes.RECTANGLE) _gr.drawRect(x, y, width, height);
  }

  _gr.beginFill(color);
  shapeGenerator();
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
