import componentTypes from "../componentTypes";

const mountGraphicsSystem = (entities: any, app: any) => entities
  .forEach(({ getComponent }: any) => {
    const component = getComponent(componentTypes.GRAPHICS);

    if (component && !component.isMounted()) {
      app.stage.addChild(component.getGraphicsObject());
      component.setMounted(true);
    }
  });

export default mountGraphicsSystem;
