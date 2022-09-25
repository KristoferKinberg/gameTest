import entityManager from "../entity/entityManager";
import componentTypes from "../componentTypes";
import didCollide from "../../utils/collision";
import {ISystemParams} from "./index";

const playerFoodCollisionSystem = ({ entities }: ISystemParams) =>
  entities.forEach((entity: any) => {
    const isPLayerMovable = entity.hasComponent(componentTypes.PLAYER_MOVABLE);

    if (!isPLayerMovable) return;

    const playerGraphics = entity.getComponent(componentTypes.GRAPHICS).getGraphicsObject();
    const entitiesWithEatableComponent = entityManager.getEntitiesByComponents([componentTypes.EATABLE]);

    const playEatSound = () => new Audio('../../../sounds/onEat.wav').play();

    entitiesWithEatableComponent
      .forEach((eatable: any) => {
        const { isMounted, getGraphicsObject } = eatable.getComponent(componentTypes.GRAPHICS);
        const eatableGraphics = getGraphicsObject();

        if (isMounted() && didCollide(eatableGraphics, playerGraphics)) {
          const playerIsBigger = playerGraphics.width > eatableGraphics.width;

          console.log(playerIsBigger);

          const scoreComponent = entity.getComponent(componentTypes.SCORE);
          getGraphicsObject().destroy();

          scoreComponent.setScore(scoreComponent.getScore() + 1);
          //playEatSound();
          eatable.destroy();
        }
      });
  });

export default {
  system: playerFoodCollisionSystem,
  dependencies: [componentTypes.PLAYER_MOVABLE, componentTypes.EATABLE]
};
