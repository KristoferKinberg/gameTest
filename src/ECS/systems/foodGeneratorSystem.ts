import componentTypes from "../componentTypes";
import {appWidth, foodMaxR} from "../../constants";
import entityManager from "../entity/entityManager";
import eatableComponent from "../components/eatableComponent";
import {ISystemParams} from "./index";
import {TILE_TYPES} from "../../utils/tileMap";
import spriteComponent from "../components/spriteComponent";
import directionComponent from "../components/directionComponent";

const foodGeneratorSystem = ({entities}: ISystemParams) =>
  entities.forEach(({ getComponent }: any) => {
    const component = getComponent(componentTypes.FOOD_TIMER);
    const width = Math.floor(Math.random() * foodMaxR);

    /**
     * Generate random components for food
     */
    const getRandomCoordinates = () => ({
      y: Math.floor(Math.random() * appWidth),
      x: -width,
    });

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
      const {x, y} = getRandomCoordinates();

      foodEntity.addComponent(eatableComponent());
      foodEntity.addComponent(directionComponent());
      foodEntity.addComponent(spriteComponent({
        x,
        y,
        width,
        height: width / 2,
        type: fishTypes[Math.floor(Math.random() * 5)],
      }));
    }
  });

export default {
  system: foodGeneratorSystem,
  dependencies: [componentTypes.FOOD_TIMER]
};
