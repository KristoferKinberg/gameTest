import componentTypes from "../componentTypes";
import {IRootComponent} from "../../types";

export interface IPlayerMovableComponent extends IRootComponent {}

const playerMovableComponent = (): IPlayerMovableComponent => {
  const _name = componentTypes.PLAYER_MOVABLE;

  const getName = () => _name;

  return {
    getName
  }
};

export default playerMovableComponent;
