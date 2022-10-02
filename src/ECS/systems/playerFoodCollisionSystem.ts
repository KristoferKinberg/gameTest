import entityManager from "../entity/entityManager";
import EntityManager from "../entity/entityManager";
import componentTypes from "../componentTypes";
import {didCollide} from "../../utils/rectangleCollision";
import {ISystemParams} from "./index";
import textComponent from "../components/textComponent";
import {appHeight, appWidth, BONE, SIZE} from "../../constants";
import {IGameRunningComponent} from "../components/gameRunningComponent";
import {TILE_TYPES} from "../../utils/tileMap";
import spriteComponent, {ISpriteComponent} from "../components/spriteComponent";
import {IEntity} from "../entity/entityGenerator";
import {Direction, IDirectioncomponent} from "../components/directionComponent";

const playerFoodCollisionSystem = ({ entities, app }: ISystemParams) =>
  entities.forEach((entity: any) => {
    const isPLayerMovable = entity.hasComponent(componentTypes.PLAYER_MOVABLE);

    if (!isPLayerMovable) return;

    const playerGraphicsComponent = entity.getComponent(componentTypes.SPRITE);
    const playerGraphicsObject = playerGraphicsComponent.getGraphicsObject();
    const entitiesWithEatableComponent = entityManager.getEntitiesByComponents([componentTypes.EATABLE]);

    const playEatSound = () => new Audio('../../../sounds/onEat.wav').play();

    /**
     * Enlarge player graphics
     */
    const resizePlayerGraphics = () => {
      playerGraphicsObject.width = playerGraphicsObject.width + 5;
      playerGraphicsObject.height = playerGraphicsObject.height + 2.5;
    };

    /**
     * On player eating fish, turn fish into skeleton
     * @param eatableEntity
     */
    const changeEatenFishToSkeleton = (eatableEntity: IEntity) => {
      const sprite = eatableEntity.getComponent<ISpriteComponent>(componentTypes.SPRITE);
      if (!sprite) return;

      const { getGraphicsObject, getType } = sprite;
      const graphicsObject = getGraphicsObject();

      const { width, height, position: { x, y }} = graphicsObject;
      const dimensions = { width, height, x, y };
      const fishColor = getType()
        .replace(`_${SIZE.SMALL}`, '')
        .replace(`_${SIZE.LARGE}`, '');

      graphicsObject.destroy();
      eatableEntity.removeComponents(componentTypes.EATABLE, componentTypes.SPRITE, componentTypes.IS_ALIVE);
      const directionComponent = eatableEntity.getComponent<IDirectioncomponent>(componentTypes.DIRECTION);
      const newSpriteComponent = eatableEntity.addComponent<ISpriteComponent>(spriteComponent({
        ...dimensions,
        type: TILE_TYPES[(`${fishColor}_${BONE}` as TILE_TYPES)],
      }));
      if (directionComponent?.getDirection() === Direction.RIGHT) newSpriteComponent.getGraphicsObject().scale.x *= -1;
    }

    /**
     * Do necessary updates to player entity when eating
     */
    const updatePlayerEntity = () => {
      const scoreComponent = entity.getComponent(componentTypes.SCORE);
      resizePlayerGraphics();
      scoreComponent.setScore(scoreComponent.getScore() + 1);
    };

    /**
     * Set centered game over text on screen
     */
    const setGameOverText = () => {
      entityManager
        .createEntity()
        .addComponent(textComponent({
        text: 'GAME OVER',
        id: 'gameOver',
        stage: app.stage,
        x: appWidth-(appWidth/2)-250,
        y: appHeight-(appHeight/2)-50,
        style: {
          fontSize: 75
        }
      }));
    }

    /**
     * Do end game things
     */
    const endGame = () => {
      setGameOverText();
      const gameEntity = EntityManager.getEntityByComponent(componentTypes.GAME_RUNNING);
      if (!gameEntity) return;
      const gameRunningComponent = gameEntity.getComponent<IGameRunningComponent>(componentTypes.GAME_RUNNING);

      entity.destroy();
      return gameRunningComponent && gameRunningComponent.setRunning(false);
    }

    const isValidCollision = (eatable: IEntity) => {
      const spriteComponent = eatable.getComponent<ISpriteComponent>(componentTypes.SPRITE);
      const isEatable = eatable.hasComponent(componentTypes.EATABLE);

      return spriteComponent
        && spriteComponent.isMounted()
        && isEatable
        && didCollide(spriteComponent.getGraphicsObject(), playerGraphicsObject);
    }

    entitiesWithEatableComponent
      .forEach((eatable: any) => {
        const { getGraphicsObject } = eatable.getComponent(componentTypes.SPRITE);
        const eatableGraphics = getGraphicsObject();

        if (isValidCollision(eatable)) {
          const playerIsBigger = playerGraphicsObject.width > eatableGraphics.width;

          if (!playerIsBigger) endGame();

          changeEatenFishToSkeleton(eatable);
          updatePlayerEntity();
          false && playEatSound();
        }
      });
  });

export default {
  system: playerFoodCollisionSystem,
  dependencies: [componentTypes.PLAYER_MOVABLE, componentTypes.EATABLE]
};
