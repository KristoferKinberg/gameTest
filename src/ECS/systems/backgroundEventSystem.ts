import {IEntity} from "../entity/entityGenerator";
import {ITimerComponent} from "../components/timerComponent";
import {ISystemParams} from "./index";
import {TILE_TYPES} from "../../utils/tileMap";
import {appHeight, appWidth} from "../../constants";
import componentTypes from "../componentTypes";
import directionComponent, {Direction} from "../components/directionComponent";
import spriteComponent, {ISpriteComponent} from "../components/spriteComponent";
import entityManager from "../entity/entityManager";

export const BACKGROUND_EVENT = 'BACKGROUND_EVENT';

const randomIntFromInterval = (min: number, max: number) => { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const backgroundAnimalTypes = [
  TILE_TYPES.SHARK,
];

const backgroundEventSystem = ({ secondsPassed, app }: ISystemParams) => {
  const timerComponents: IEntity[] = entityManager.getEntitiesByComponents([componentTypes.TIMER]);

  const isDue = (endTime: number, timePassed: number) => timePassed > endTime;

  const generateBackgroundCreature = () => {
    const width = randomIntFromInterval(1000, 1500);
    const direction = Object.values(Direction)[randomIntFromInterval(0, 1)];
    const height = width / 2;
    const bgAnimalEntity = entityManager.createEntity();
    const y = randomIntFromInterval(0, appHeight);
    const x = direction === Direction.RIGHT
      ? appWidth
      : - width;


    bgAnimalEntity.addComponent(directionComponent(direction));
    const { getGraphicsObject } = bgAnimalEntity.addComponent<ISpriteComponent>(spriteComponent({
      x,
      y,
      width,
      height,
      type: backgroundAnimalTypes[randomIntFromInterval(0, backgroundAnimalTypes.length-1)],
    }));
    const animalGraphics = getGraphicsObject();
    if (direction === Direction.LEFT) animalGraphics.scale.x *= -1;
    animalGraphics.alpha = .1;
    app.stage.addChild(animalGraphics);
  }

  const backgroundEvent = timerComponents
    .find(({ getComponent }) => {
      const timerComponent = getComponent<ITimerComponent>(componentTypes.TIMER)
      return !!timerComponent && timerComponent.getId() === BACKGROUND_EVENT;
    })!;

  const { getEndTime, setEndTime, setTimePassed, getTimePassed, reset }
    = backgroundEvent.getComponent<ITimerComponent>(componentTypes.TIMER)!;

  setTimePassed(secondsPassed);

  if (isDue(getEndTime(), getTimePassed())) {
    setEndTime(Math.random() * randomIntFromInterval(20, 30));
    generateBackgroundCreature();
    reset();
  }
}

export default {
  system: backgroundEventSystem,
  dependencies: [componentTypes.TIMER]
};
