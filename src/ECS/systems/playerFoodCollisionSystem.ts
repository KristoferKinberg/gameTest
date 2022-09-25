import entityManager from "../entity/entityManager";
import componentTypes from "../componentTypes";
import didCollide from "../../utils/collision";
import {ISystemParams} from "./index";

const playerFoodCollisionSystem = ({ entities }: ISystemParams) =>
  entities.forEach((entity: any) => {
    const isPLayerMovable = entity.hasComponent(componentTypes.PLAYER_MOVABLE);

    if (!isPLayerMovable) return;

    const playerGraphicsComponent = entity.getComponent(componentTypes.GRAPHICS);
    const playerGraphicsObject = playerGraphicsComponent.getGraphicsObject();
    const entitiesWithEatableComponent = entityManager.getEntitiesByComponents([componentTypes.EATABLE]);

    const playEatSound = () => new Audio('../../../sounds/onEat.wav').play();

    const resizePlayerGraphics = () => {
      const previousRadius = playerGraphicsObject.width / 2;

      //console.log(previousRadius, previousPosition);

      playerGraphicsObject.clear();
      playerGraphicsObject.beginFill(0xffffff);
      playerGraphicsObject.drawCircle(0 ,0, previousRadius + 2);
      playerGraphicsObject.endFill();
    };

    entitiesWithEatableComponent
      .forEach((eatable: any) => {
        const { isMounted, getGraphicsObject } = eatable.getComponent(componentTypes.GRAPHICS);

        if (isMounted() && didCollide(getGraphicsObject(), playerGraphicsObject)) {
          resizePlayerGraphics();
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
