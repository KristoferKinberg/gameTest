import entityManager from "../entity/entityManager";
import componentTypes from "../componentTypes";
import didCollide from "../../utils/collision";
import {ISystemParams} from "./index";

const playerFoodCollisionSystem = ({ entities }: ISystemParams) =>
  entities.forEach((entity: any) => {
    const isPLayerMovable = entity.getComponent(componentTypes.PLAYER_MOVABLE);

    if (!isPLayerMovable) return;

    const playerGraphics = entity.getComponent(componentTypes.GRAPHICS).getGraphicsObject();
    //const newSize = playerGraphics.width + 2;
    const entitiesWithEatableComponent = entityManager.getEntitiesByComponents([componentTypes.EATABLE]);
    //playerGraphics.scale.set(newSize, newSize);

    entitiesWithEatableComponent
      .forEach((eatable: any) => {
        const { isMounted, getGraphicsObject } = eatable.getComponent(componentTypes.GRAPHICS);

        if (isMounted() && didCollide(getGraphicsObject(), playerGraphics)) {
          const scoreComponent = entity.getComponent(componentTypes.SCORE);
          getGraphicsObject().destroy();

          scoreComponent.setScore(scoreComponent.getScore() + 1);
          eatable.destroy();
        }
      });
  });

export default {
  system: playerFoodCollisionSystem,
  dependencies: [componentTypes.PLAYER_MOVABLE, componentTypes.EATABLE]
};
