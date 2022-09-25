import componentTypes from "../componentTypes";
import {IRootComponent} from "../../types";

export interface IGameRunningComponent extends IRootComponent {
  isRunning(): boolean;
  setRunning(running: boolean): void;
}

interface IProps {
  running: boolean
}

const gameRunningComponent = ({ running = false }: IProps): IGameRunningComponent => {
  const _name = componentTypes.GAME_RUNNING;
  let _running = running;

  const getName = () => _name;

  const isRunning = () => _running;

  const setRunning = (running: boolean) => {
    _running = running;
  }

  return {
    getName,
    isRunning,
    setRunning,
  }
};

export default gameRunningComponent;
