import entityManager from "../entity/entityManager";
import EntityManager from "../entity/entityManager";
import componentTypes from "../componentTypes";
import { didCollide } from "../../utils/rectangleCollision";
import {ISystemParams} from "./index";
import textComponent from "../components/textComponent";
import {appHeight, appWidth} from "../../constants";
import {IGameRunningComponent} from "../components/gameRunningComponent";

const playerFoodCollisionSystem = ({ entities, app }: ISystemParams) =>
  entities.forEach((entity: any) => {
    const isPLayerMovable = entity.hasComponent(componentTypes.PLAYER_MOVABLE);

    if (!isPLayerMovable) return;

    const playerGraphicsComponent = entity.getComponent(componentTypes.SPRITE);
    const playerGraphicsObject = playerGraphicsComponent.getGraphicsObject();
    const entitiesWithEatableComponent = entityManager.getEntitiesByComponents([componentTypes.EATABLE]);

    const playEatSound = () => new Audio('../../../sounds/onEat.wav').play();

    const resizePlayerGraphics = () => {
      playerGraphicsObject.width = playerGraphicsObject.width + 5;
      playerGraphicsObject.height = playerGraphicsObject.height + 5;
    };

    entitiesWithEatableComponent
      .forEach((eatable: any) => {
        const { isMounted, getGraphicsObject } = eatable.getComponent(componentTypes.SPRITE);
        const eatableGraphics = getGraphicsObject();

        if (isMounted() && didCollide(eatableGraphics, playerGraphicsObject)) {
          const playerIsBigger = playerGraphicsObject.width > eatableGraphics.width;

          if (!playerIsBigger) {
            const gameOverEntity = entityManager.createEntity();
            gameOverEntity.addComponent(textComponent({
              text: 'GAME OVER',
              id: 'gameOver',
              stage: app.stage,
              x: appWidth-(appWidth/2)-250,
              y: appHeight-(appHeight/2)-50,
              style: {
                fontSize: 75
              }
            }));

            const gameEntity = EntityManager.getEntityByComponent(componentTypes.GAME_RUNNING);
            if (!gameEntity) return;
            const gameRunningComponent = gameEntity.getComponent<IGameRunningComponent>(componentTypes.GAME_RUNNING);

            gameRunningComponent && gameRunningComponent.setRunning(false);
          }

          const scoreComponent = entity.getComponent(componentTypes.SCORE);
          getGraphicsObject().destroy();
          resizePlayerGraphics();
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
