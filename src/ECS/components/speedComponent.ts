import componentTypes from "../componentTypes";
import {IRootComponent} from "../../types";
import {KEYS} from "../../keymap";

export interface ISpeedObject {
  speed: number;
  oppositeDirection: keyof typeof KEYS;
}

export type ISpeedMap = {
  [key in keyof typeof KEYS]: ISpeedObject;
};

export interface ISpeedComponent extends IRootComponent {
  setDirectionSpeed(direction: keyof typeof KEYS, speed: number): void;
  getSpeedMap(): ISpeedMap;
  getOppositeDirection(): keyof typeof KEYS;
}

const SpeedComponent = (): ISpeedComponent => {
  const _name = componentTypes.SPEED;
  const _speedMap: ISpeedMap = {
    [KEYS.ARROW_LEFT]: {
      speed: 0,
      oppositeDirection: KEYS.ARROW_RIGHT
    },
    [KEYS.ARROW_RIGHT]:  {
      speed: 0,
      oppositeDirection: KEYS.ARROW_LEFT
    },
    [KEYS.ARROW_UP]:  {
      speed: 0,
      oppositeDirection: KEYS.ARROW_DOWN
    },
    [KEYS.ARROW_DOWN]:  {
      speed: 0,
      oppositeDirection: KEYS.ARROW_UP
    },
  };

  const getName = () => _name;

  const setDirectionSpeed = (direction: keyof typeof KEYS, speed: number) => {
    _speedMap[direction].speed = speed;
  }

  const getSpeedMap = () => _speedMap;

  const getOppositeDirection = (direction: keyof typeof KEYS) => {
    return _speedMap[direction].oppositeDirection;
  }

  return {
    getName,
    setDirectionSpeed,
    getSpeedMap,
    getOppositeDirection,
  }
};

export default SpeedComponent;
