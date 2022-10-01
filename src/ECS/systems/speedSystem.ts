import componentTypes from "../componentTypes";
import {ISystemParams} from "./index";
import EntityManager from "../entity/entityManager";
import keyMap, {KEYS} from "../../keymap";
import {ISpeedComponent} from "../components/speedComponent";

let timePassedSinceSpeedChange = 0;

const speedSystem = ({ secondsPassed }: ISystemParams) => {
  const playerEntity = EntityManager.getEntityByComponent(componentTypes.PLAYER_MOVABLE);
  if (!playerEntity) return;

  const speedComponent = playerEntity.getComponent<ISpeedComponent>(componentTypes.SPEED);
  if (!speedComponent) return;

  const acceleration = 0.6;
  const maxSpeed = 4;
  const speedMapCopy = speedComponent.getSpeedMap();

  const getNewSpeed = (speed: number) => {
    if (speed < 0) return 0;
    if (speed > maxSpeed) return maxSpeed;

    return speed;
  }

  const handleFunc = (key: keyof typeof KEYS) => {
    const oppositeDirection = speedComponent.getOppositeDirection(key);

    if (speedMapCopy[oppositeDirection].speed === 0 && keyMap[key])
      return speedComponent.setDirectionSpeed(key, getNewSpeed(speedMapCopy[key].speed + acceleration));

    if (keyMap[oppositeDirection])
      return speedComponent.setDirectionSpeed(key, getNewSpeed(speedMapCopy[key].speed - (acceleration * 2)));

    return speedComponent.setDirectionSpeed(key, getNewSpeed(speedMapCopy[key].speed - acceleration));
  }

  if (!isNaN(secondsPassed)) timePassedSinceSpeedChange = timePassedSinceSpeedChange + secondsPassed;
  if (timePassedSinceSpeedChange > .1) {
    timePassedSinceSpeedChange = 0;
    Object.values(KEYS).forEach(handleFunc);
  }
}

export default {
  system: speedSystem,
  dependencies: [componentTypes.PLAYER_MOVABLE]
};
