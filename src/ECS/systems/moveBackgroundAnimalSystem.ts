import componentTypes from "../componentTypes";
import {IEntity} from "../entity/entityGenerator";
import entityManager from "../entity/entityManager";
import {ISpriteComponent} from "../components/spriteComponent";
import {backgroundAnimalTypes} from "./backgroundEventSystem";
import {Direction, IDirectionComponent} from "../components/directionComponent";
import {appWidth} from "../../constants";

const moveBackgroundAnimalSystem = () => {
  const timerComponents: IEntity[] = entityManager.getEntitiesByComponents([componentTypes.SPRITE]);

  const isBackgroundAnimalEntity = ({ getComponent }: IEntity) => {
    const spiteComponent = getComponent<ISpriteComponent>(componentTypes.SPRITE)
    return !!spiteComponent && backgroundAnimalTypes.includes(spiteComponent.getType())
  };

  const isOutsideScreen = (direction: Direction, currentX: number, width: number) => {
    if (direction === Direction.RIGHT) return currentX + width < 0;
    return currentX - width > appWidth;
  }

  const getNewX = (direction: Direction, currentX: number) => direction === Direction.RIGHT
    ? currentX - 5
    : currentX + 5;

  timerComponents
    .filter(isBackgroundAnimalEntity).forEach((entity) => {
      const backgroundAnimalGraphics = entity.getComponent<ISpriteComponent>(componentTypes.SPRITE)!.getGraphicsObject();
      const direction = entity.getComponent<IDirectionComponent>(componentTypes.DIRECTION)!.getDirection();
      const currentX = backgroundAnimalGraphics.position.x;

      if (isOutsideScreen(direction, currentX, backgroundAnimalGraphics.width)) {
        backgroundAnimalGraphics.destroy();
        return entity.destroy();
      }

      backgroundAnimalGraphics.position.x = getNewX(direction, currentX);
    });
}

export default {
  system: moveBackgroundAnimalSystem,
  dependencies: [componentTypes.TIMER]
}
