import componentTypes from "../componentTypes";

const foodTimerSystem = (entities: any) => entities
  .forEach(({ getComponent }: any) => {
    const component = getComponent(componentTypes.FOOD_TIMER);

    if (component) {
      if (component.getFoodTimer() === 50) {
        component.setFoodTimer(0);
        return component.setShouldGenerate(true);
      }
      if (!component.getIsPaused()) {
        component.setFoodTimer(component.getFoodTimer() + 1);
        component.setShouldGenerate(false);
      }
    }

    return;
  });

export default foodTimerSystem;
