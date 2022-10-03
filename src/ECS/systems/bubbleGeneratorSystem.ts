import componentTypes from "../componentTypes";
import {ISystemParams} from "./index";
import entityManager from "../entity/entityManager";
import EntityManager from "../entity/entityManager";
import {IEntity} from "../entity/entityGenerator";
import {ITimerComponent} from "../components/timerComponent";
import spriteComponent, {ISpriteComponent} from "../components/spriteComponent";
import {TILE_TYPES} from "../../utils/tileMap";
import {Direction, IDirectionComponent} from "../components/directionComponent";

export const BUBBLE_TIMER_ID = 'bubbleTimer';

const bubbleGeneratorSystem = ({ secondsPassed, app }: ISystemParams) => {
  const timerComponents: IEntity[] = entityManager.getEntitiesByComponents([componentTypes.TIMER]);
  const playerEntity: IEntity = EntityManager.getEntityByComponent(componentTypes.PLAYER_MOVABLE)!;

  const isDue = (endTime: number, timePassed: number) => timePassed > endTime;

  const generateBubble = () => {
    const { width, position: { x, y }} = playerEntity.getComponent<ISpriteComponent>(componentTypes.SPRITE)!.getGraphicsObject();
    const direction = playerEntity.getComponent<IDirectionComponent>(componentTypes.DIRECTION)!.getDirection();

    const newX = direction === Direction.LEFT
      ? x - width
      : x + width

    const bubbleEntity = entityManager.createEntity();
    const { getGraphicsObject } = bubbleEntity.addComponent<ISpriteComponent>(spriteComponent({ x: newX, y, width: 15, height: 15, type: TILE_TYPES.BUBBLE }));
    app.stage.addChild(getGraphicsObject());
  }

  timerComponents
    .filter(({ getComponent }) => {
      const timerComponent = getComponent<ITimerComponent>(componentTypes.TIMER)
      return !!timerComponent && timerComponent.getId() === BUBBLE_TIMER_ID
    })
    .forEach(({ getComponent }) => {
    const { getEndTime, setEndTime, setTimePassed, getTimePassed, reset }: ITimerComponent = getComponent(componentTypes.TIMER)!;

    setTimePassed(secondsPassed);

    if (isDue(getEndTime(), getTimePassed())) {
      generateBubble();
      setEndTime(Math.random() * 1.5);
      reset();
    }
  });
}

export default {
  system: bubbleGeneratorSystem,
  dependencies: [componentTypes.TIMER]
};
