import componentTypes from "../componentTypes";
import {IRootComponent} from "../../types";

export interface IEatableComponent extends IRootComponent {}

const eatableComponent = (): IEatableComponent => {
  const _name = componentTypes.EATABLE;

  const getName = () => _name;

  return {
    getName,
  }
};

export default eatableComponent;
