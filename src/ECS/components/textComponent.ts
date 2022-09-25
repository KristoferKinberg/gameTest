import componentTypes from "../componentTypes";
import {Text} from "pixi.js";
import * as PIXI from 'pixi.js'
import {IRootComponent} from "../../types";

interface IStyle {
  fontFamily?: string;
  fontSize?: number;
  fill?: number;
  align?: any;
}

interface IParams {
  text: string;
  id: string;
  stage: PIXI.Container;
  style?: IStyle;
  x?: number;
  y?: number;
}

export interface ITextComponent extends IRootComponent {
  isMounted: () => boolean;
  setMounted: (isMounted: boolean) => boolean;
  getId: () => IParams["id"];
  setText: () => IParams["text"]
}

const textComponent = ({
  text,
  id,
  stage,
  style = {},
  x = 35,
  y = 35,
}: IParams) => {
  const _name = componentTypes.TEXT;
  let _mounted = false;

  // @ts-ignore
  const mergedStyles: PIXI.TextStyle = {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0x00ff00,
    align: 'center',
    ...style
  }

  const textObj = new Text(text, mergedStyles);
  textObj.position.x = x;
  textObj.position.y = y;
  stage.addChild(textObj);

  const getName = () => _name;

  const getMounted = () => _mounted;

  const setMounted = (mounted: boolean) => _mounted = mounted;

  const getId = () => id;

  const setText = (text: string) => textObj.text = text;

  return {
    getName,
    getMounted,
    setMounted,
    getId,
    setText,
  }
};

export default textComponent;
