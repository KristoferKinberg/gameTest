import componentTypes from "../componentTypes";
import {IEntity} from "../entity/entityGenerator";
import entityManager from "../entity/entityManager";
import {ISpriteComponent} from "../components/spriteComponent";
import {TILE_TYPES} from "../../utils/tileMap";

const bubbleMoverSystem = () => {
  const timerComponents: IEntity[] = entityManager.getEntitiesByComponents([componentTypes.SPRITE]);

  const isBubbleEntity = ({ getComponent }: IEntity) => {
    const spiteComponent = getComponent<ISpriteComponent>(componentTypes.SPRITE)
    return !!spiteComponent && spiteComponent.getType() === TILE_TYPES.BUBBLE
  };

  timerComponents
    .filter(isBubbleEntity).forEach((entity) => {
      const bubbleGraphicsObjet = entity.getComponent<ISpriteComponent>(componentTypes.SPRITE)!.getGraphicsObject();
      const isOutsideScreen = bubbleGraphicsObjet.position.y + bubbleGraphicsObjet.height < 0;
      if (isOutsideScreen) {
        bubbleGraphicsObjet.destroy();
        return entity.destroy();
      }
      bubbleGraphicsObjet.position.y = bubbleGraphicsObjet.position.y - 5;
    });
}

export default {
  system: bubbleMoverSystem,
  dependencies: [componentTypes.TIMER]
}
