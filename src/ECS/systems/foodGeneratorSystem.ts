import componentTypes from "../componentTypes";
import {appWidth, foodMaxR} from "../../constants";
import entityManager from "../entity/entityManager";
import eatableComponent from "../components/eatableComponent";
import {ISystemParams} from "./index";
import {TILE_TYPES} from "../../utils/tileMap";
import spriteComponent from "../components/spriteComponent";
import directionComponent, {Direction} from "../components/directionComponent";
import aliveComponent from "../components/aliveComponent";

const foodGeneratorSystem = ({entities}: ISystemParams) =>
  entities.forEach(({ getComponent }: any) => {
    const component = getComponent(componentTypes.FOOD_TIMER);
    const width = Math.floor(Math.random() * foodMaxR);
    const direction = Boolean(Math.floor(Math.random() * 2))
      ? Direction.LEFT
      : Direction.RIGHT;
    /**
     * Generate random components for food
     */
    const getRandomYCoordinate = () => Math.floor(Math.random() * appWidth);

    const fishTypes = [
      TILE_TYPES.GREEN_SMALL,
      TILE_TYPES.GREEN_LARGE,
      TILE_TYPES.PURPLE_SMALL,
      TILE_TYPES.PURPLE_LARGE,
      TILE_TYPES.BLUE_SMALL,
      TILE_TYPES.BLUE_LARGE,
      TILE_TYPES.ORANGE_SMALL,
      TILE_TYPES.ORANGE_LARGE,
    ]

    if (component && component.getShouldGenerate()) {
      const foodEntity = entityManager.createEntity();

      foodEntity.addComponent(eatableComponent());
      foodEntity.addComponent(directionComponent(direction));
      foodEntity.addComponent(aliveComponent());
      foodEntity.addComponent(spriteComponent({
        x: direction === Direction.LEFT
          ? -width
          : appWidth + width,
        y: getRandomYCoordinate(),
        width,
        height: width / 2,
        type: fishTypes[Math.floor(Math.random() * fishTypes.length)],
      }));

      if (direction === Direction.RIGHT) {
        // @ts-ignore
        const sprite = foodEntity.getComponent(componentTypes.SPRITE).getGraphicsObject();
        sprite.scale.x *= -1
      }
    }
  });

export default {
  system: foodGeneratorSystem,
  dependencies: [componentTypes.FOOD_TIMER]
};
