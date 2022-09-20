import componentTypes from "../componentTypes";

const foodTimerComponent = () => {
  let foodTimer = 0;
  let shouldGenerate = true;
  let isPaused = false;

  return {
    name: componentTypes.FOOD_TIMER,
    foodTimer,
    isPaused,
    shouldGenerate,
  }
};

export default foodTimerComponent;
