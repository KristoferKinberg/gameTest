import componentTypes from "../componentTypes";
import {ISystemParams} from "./index";
import EntityManager from "../entity/entityManager";
import {IGraphicsComponent} from "../components/graphicsComponent";
import {appWidth} from "../../constants";

const moveEatableSystems = ({}: ISystemParams) => {
  const EatableEntities = EntityManager.getEntitiesByComponents([componentTypes.EATABLE]);

  EatableEntities.forEach((entity) => {
    const grahpicsComponent = entity.getComponent<IGraphicsComponent>(componentTypes.GRAPHICS);
    // @ts-ignore
    const graphicsObject = grahpicsComponent.getGraphicsObject();
    const newXPosition = graphicsObject.position.x + 5;
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

