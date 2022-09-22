import componentTypes from "../componentTypes";
import {Text} from "pixi.js";
import * as PIXI from 'pixi.js'

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

const textComponent = ({
  text,
  id,
  stage,
  style = {},
  x = 35,
  y = 35,
}: IParams) => {
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

  return {
    name: componentTypes.TEXT,
    mounted: false,
    id,
    textObj,
    x,
    y
  }
};

export default textComponent;
