import componentTypes from "../componentTypes";
import {IRootComponent} from "../../types";

export interface IFoodTimerComponent extends IRootComponent {
  setFoodTimer: (foodTimer: number) => number;
  getFoodTimer: () => number;
  setShouldGenerate: (shouldGenerate: boolean) => boolean;
  getShouldGenerate: () => boolean;
  setIsPaused: (isPaused: boolean) => boolean;
  getIsPaused: () => boolean;
}

const foodTimerComponent = (): IFoodTimerComponent => {
  const _name = componentTypes.FOOD_TIMER;
  let _foodTimer: number = 0;
  let _shouldGenerate: boolean = true;
  let _isPaused: boolean = false;

  const getName = () => _name;

  const setFoodTimer = (foodTimer: number) => _foodTimer = foodTimer;

  const getFoodTimer = () => _foodTimer;

  const setShouldGenerate = (shouldGenerate: boolean) => _shouldGenerate = shouldGenerate;

  const getShouldGenerate = () => _shouldGenerate;

  const setIsPaused = (isPaused: boolean) => _isPaused = isPaused;

  const getIsPaused = () => _isPaused;

  return {
    getName,
    setFoodTimer,
    getFoodTimer,
    setShouldGenerate,
    getShouldGenerate,
    setIsPaused,
    getIsPaused,
  }
};

export default foodTimerComponent;
