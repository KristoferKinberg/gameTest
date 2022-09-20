import keyMap from "../../keymap";
import {appHeight, appWidth} from "../../constants";
import * as PIXI from 'pixi.js'
import componentTypes from "../componentTypes";

const handleUserInputSystem = (entities: any) => {
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

  const handleInput = (playerObj: PIXI.Graphics) => {
    // if (keyMap.Escape) stop = true;

    if (keyMap.ArrowUp && !isTopEdgeOfScreen(playerObj))
      playerObj.position.y = playerObj.getGlobalPosition().y - 2;

    if (keyMap.ArrowDown && !isBottomEdgeOfScreen(playerObj))
      playerObj.position.y = playerObj.getGlobalPosition().y + 2;

    if (keyMap.ArrowLeft && !isLeftEdgeOfScreen(playerObj))
      playerObj.position.x = playerObj.getGlobalPosition().x - 2;

    if (keyMap.ArrowRight && !isRightEdgeOfScreen(playerObj))
      playerObj.position.x = playerObj.getGlobalPosition().x + 2;
  };

  return entities
    .forEach(({ getComponent }: any) => {
      const isPLayerMovable = getComponent(componentTypes.PLAYER_MOVABLE);

      if (isPLayerMovable) {
        const { graphicsObj } = getComponent(componentTypes.GRAPHICS);

        handleInput(graphicsObj)
      }
    });
}

export default handleUserInputSystem;
