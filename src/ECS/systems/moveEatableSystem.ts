import componentTypes from "../componentTypes";
import {ISystemParams} from "./index";
import EntityManager from "../entity/entityManager";
import {IGraphicsComponent} from "../components/graphicsComponent";
import {appWidth, foodMaxR} from "../../constants";

const moveEatableSystems = ({ secondsPassed }: ISystemParams) => {
  const EatableEntities = EntityManager.getEntitiesByComponents([componentTypes.EATABLE]);

  EatableEntities.forEach((entity) => {
    const grahpicsComponent = entity.getComponent<IGraphicsComponent>(componentTypes.SPRITE);
    // @ts-ignore
    const graphicsObject = grahpicsComponent.getGraphicsObject();
    const xValue = (foodMaxR - (graphicsObject.width / 2)) / 25;
    const newXPosition = (graphicsObject.position.x + xValue);

    const shouldDestroy = (newXPosition - graphicsObject.width) > appWidth;

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

