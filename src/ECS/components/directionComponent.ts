import componentTypes from "../componentTypes";
import { IRootComponent } from "../../types";

export enum Direction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export interface IDirectioncomponent extends IRootComponent {
  getDirection: () => Direction;
  setDirection: (direction: Direction) => Direction;
}

const directionComponent = (direction = Direction.LEFT): IDirectioncomponent => {
  const _name = componentTypes.DIRECTION;

  let _direction = direction;

  const getName = () => _name;

  const getDirection = () => _direction;

  const setDirection = (newDirection: Direction) => _direction = newDirection;

  return {
    getName,
    getDirection,
    setDirection
  }
};

export default directionComponent;
