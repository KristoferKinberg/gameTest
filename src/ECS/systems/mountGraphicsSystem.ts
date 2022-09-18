const mountGraphicsSystem = (entities: any, app: any) => entities
  .forEach(({ getComponent }: any) => {
    const component = getComponent('graphics');
    if (component && !component.mounted) {
      app.stage.addChild(component.graphicsObj);
      component.mounted = true;
    }
  });

export default mountGraphicsSystem;
