import componentTypes from "../componentTypes";
import EntityManager from "../entity/entityManager";
import {IGraphicsComponent} from "../components/graphicsComponent";
import {appHeight, appWidth, foodMaxR} from "../../constants";
import {Direction, IDirectioncomponent} from "../components/directionComponent";

const moveEatableSystems = () => {
  const EatableEntities = EntityManager.getEntitiesByComponents([componentTypes.EATABLE]);

  EatableEntities.forEach((entity) => {
    const graphicsComponent = entity.getComponent<IGraphicsComponent>(componentTypes.SPRITE);
    const direction = entity.getComponent<IDirectioncomponent>(componentTypes.DIRECTION)?.getDirection();
    const isAlive = entity.hasComponent(componentTypes.IS_ALIVE);

    if (!graphicsComponent) return;

    const graphicsObject = graphicsComponent.getGraphicsObject();
    const yPos = graphicsObject.position.y;

    if (!isAlive) {
      if (yPos < appHeight-100){
        graphicsObject.position.y = yPos + 8;
      }
      return;
    }

    // @ts-ignore
    const xValue = (foodMaxR - (graphicsObject.width / 2)) / 25;

    const newXPosition = direction === Direction.LEFT
      ? (graphicsObject.position.x + xValue)
      : graphicsObject.position.x - xValue;

    const shouldDestroy = direction === Direction.LEFT
      ? (newXPosition - graphicsObject.width) > appWidth
      : (newXPosition + graphicsObject.width) < 0;

    if (shouldDestroy) {
      graphicsObject.destroy();
      entity.destroy();
      return;
    }

    graphicsObject.position.x = newXPosition;
  });
}

export default {
  system: moveEatableSystems,
  dependencies: []
};

