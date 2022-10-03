import keyMap, {KEYS} from "../../keymap";
import {appHeight, appWidth} from "../../constants";
import * as PIXI from 'pixi.js'
import componentTypes from "../componentTypes";
import {ISystemParams} from "./index";
import {Direction, IDirectionComponent} from "../components/directionComponent";
import {IGraphicsComponent} from "../components/graphicsComponent";

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

  const handleDirection = (directionComponent: IDirectionComponent, graphicsComponent: IGraphicsComponent) => {
    const direction = directionComponent.getDirection();
    const graphicsObject = graphicsComponent.getGraphicsObject();

    if (keyMap.ArrowLeft && direction !== Direction.LEFT) {
      directionComponent.setDirection(Direction.LEFT);
      graphicsObject.scale.x *= -1;
      graphicsObject.position.x = graphicsObject.position.x + graphicsObject.width;
    }
    if (keyMap.ArrowRight && direction !== Direction.RIGHT) {
      directionComponent.setDirection(Direction.RIGHT);
      graphicsObject.scale.x *= -1;
      graphicsObject.position.x = graphicsObject.position.x - graphicsObject.width;
    }

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
      const directionComponent = getComponent(componentTypes.DIRECTION);

      if (isPLayerMovable && graphicsComponent && directionComponent) {
        handleDirection(directionComponent, graphicsComponent);
        handleInput(graphicsComponent.getGraphicsObject(), speedComponent.getSpeedMap());
      }
    });
}

export default {
  system: handleUserInputSystem,
  dependencies: [componentTypes.PLAYER_MOVABLE, componentTypes.SPRITE],
};
