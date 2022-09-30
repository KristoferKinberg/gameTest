import {KEYS} from "../../keymap";
import {appHeight, appWidth} from "../../constants";
import * as PIXI from 'pixi.js'
import componentTypes from "../componentTypes";
import {ISystemParams} from "./index";

const handleUserInputSystem = ({ entities }: ISystemParams) => {
  const isTopEdgeOfScreen = (playerObj: PIXI.Graphics) => {
    const yPosition = playerObj.getBounds().y;
    return (yPosition - 3) < 0;
  }

  const isBottomEdgeOfScreen = (playerObj: PIXI.Graphics) => {
    const yPosition = playerObj.getBounds().y;
    return (yPosition + playerObj.height + 3) > appHeight;
  }

  const isLeftEdgeOfScreen = (playerObj: PIXI.Graphics) => {
    const xPosition = playerObj.getBounds().x;
    return (xPosition - 3) < 0;
  }

  const isRightEdgeOfScreen = (playerObj: PIXI.Graphics) => {
    const xPosition = playerObj.getBounds().x;
    return (xPosition + playerObj.width + 3) > appWidth;
  }

  const handleInput = (playerObj: PIXI.Graphics, speedMap: any) => {
    // if (keyMap.Escape) stop = true;

    if (speedMap[KEYS.ARROW_UP].speed && !isTopEdgeOfScreen(playerObj))
      playerObj.position.y = playerObj.getGlobalPosition().y - speedMap[KEYS.ARROW_UP].speed;

    if (speedMap[KEYS.ARROW_DOWN].speed && !isBottomEdgeOfScreen(playerObj))
      playerObj.position.y = playerObj.getGlobalPosition().y + speedMap[KEYS.ARROW_DOWN].speed;

    if (speedMap[KEYS.ARROW_LEFT].speed && !isLeftEdgeOfScreen(playerObj))
      playerObj.position.x = playerObj.getGlobalPosition().x - speedMap[KEYS.ARROW_LEFT].speed;

    if (speedMap[KEYS.ARROW_RIGHT].speed && !isRightEdgeOfScreen(playerObj))
      playerObj.position.x = playerObj.getGlobalPosition().x + speedMap[KEYS.ARROW_RIGHT].speed;
  };

  return entities
    .forEach(({ getComponent }: any) => {
      const isPLayerMovable = getComponent(componentTypes.PLAYER_MOVABLE);
      const graphicsComponent = getComponent(componentTypes.SPRITE);
      const speedComponent = getComponent(componentTypes.SPEED);

      if (isPLayerMovable && graphicsComponent) {
        handleInput(graphicsComponent.getGraphicsObject(), speedComponent.getSpeedMap());
      }
    });
}

export default {
  system: handleUserInputSystem,
  dependencies: [componentTypes.PLAYER_MOVABLE, componentTypes.SPRITE],
};
