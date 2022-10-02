import componentTypes from "../componentTypes";
import { IRootComponent } from "../../types";

export interface IAliveComponent extends IRootComponent {}

const aliveComponent = (): IAliveComponent => {
  const _name = componentTypes.IS_ALIVE;

  const getName = () => _name;

  return {
    getName
  }
};

export default aliveComponent;
