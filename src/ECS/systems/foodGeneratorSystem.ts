import componentTypes from "../componentTypes";
import {appWidth, foodMaxR} from "../../constants";
import entityManager from "../entity/entityManager";
import eatableComponent from "../components/eatableComponent";
import graphicsComponent from "../components/graphicsComponent";
import {ISystemParams} from "./index";

const foodGeneratorSystem = ({entities}: ISystemParams) =>
  entities.forEach(({ getComponent }: any) => {
    const component = getComponent(componentTypes.FOOD_TIMER);
    const r = Math.floor(Math.random() * foodMaxR);

    /**
     * Generate random components for food
     */
    const getRandomCoordinates = () => ({
      y: Math.floor(Math.random() * appWidth),
      x: -r,
    });

    if (component && component.getShouldGenerate()) {
      const foodEntity = entityManager.createEntity();
      const {x, y} = getRandomCoordinates();

      foodEntity.addComponent(eatableComponent());
      foodEntity.addComponent(graphicsComponent({
        x,
        y,
        r,
        color: 0xff0000,
        border: {
          color: 0x00ffff,
          thickness: 10,
        }
      }));
    }
  });

export default {
  system: foodGeneratorSystem,
  dependencies: [componentTypes.FOOD_TIMER]
};
