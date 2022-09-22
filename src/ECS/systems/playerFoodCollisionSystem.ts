import entityManager from "../entity/entityManager";
import componentTypes from "../componentTypes";
import didCollide from "../../utils/collision";

const playerFoodCollisionSystem = (entities: any) => entities
  .forEach((entity: any) => {
    const isPLayerMovable = entity.getComponent(componentTypes.PLAYER_MOVABLE);

    if (!isPLayerMovable) return;

    const playerGraphics = entity.getComponent(componentTypes.GRAPHICS).graphicsObj;
    //const newSize = playerGraphics.width + 2;
    const entitiesWithEatableComponent = entityManager.getEntitiesByComponents([componentTypes.EATABLE]);
    //playerGraphics.scale.set(newSize, newSize);

    entitiesWithEatableComponent
      .forEach((eatable: any) => {
        const { graphicsObj, mounted } = eatable.getComponent(componentTypes.GRAPHICS);

        if (mounted && didCollide(graphicsObj, playerGraphics)) {
          graphicsObj.destroy();
          entity.getComponent(componentTypes.SCORE).score++;
          eatable.destroy();
        }
      });
  });

export default playerFoodCollisionSystem;
