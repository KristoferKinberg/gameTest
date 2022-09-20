import componentTypes from "../componentTypes";

const foodTimerSystem = (entities: any) => entities
  .forEach(({ getComponent }: any) => {
    const component = getComponent(componentTypes.FOOD_TIMER);

    if (component) {
      if (component.foodTimer === 50) {
        component.foodTimer = 0;
        return component.shouldGenerate = true;
      }
      if (!component.isPaused) {
        component.foodTimer++;
        component.shouldGenerate = false;
      }
    }

    return;
  });

export default foodTimerSystem;
