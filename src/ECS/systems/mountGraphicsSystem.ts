import componentTypes from "../componentTypes";

const mountGraphicsSystem = (entities: any, app: any) => entities
  .forEach(({ getComponent }: any) => {
    const component = getComponent(componentTypes.GRAPHICS);
    if (component && !component.mounted) {
      app.stage.addChild(component.graphicsObj);
      component.mounted = true;
    }
  });

export default mountGraphicsSystem;
