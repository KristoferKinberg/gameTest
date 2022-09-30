import componentTypes from "../componentTypes";
import {ISystemParams} from "./index";

const mountGraphicsSystem = ({ entities, app }: ISystemParams) =>
  entities.forEach(({ getComponent }: any) => {
    const component = getComponent(componentTypes.SPRITE);

    if (component && !component.isMounted()) {
      app.stage.addChild(component.getGraphicsObject());
      component.setMounted(true);
    }
  });

export default {
  system: mountGraphicsSystem,
  dependencies: [componentTypes.SPRITE]
};
