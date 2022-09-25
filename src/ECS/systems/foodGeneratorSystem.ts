import componentTypes from "../componentTypes";
import {appHeight, appWidth} from "../../constants";
import entityManager from "../entity/entityManager";
import eatableComponent from "../components/eatableComponent";
import graphicsComponent from "../components/graphicsComponent";
import {ISystemParams} from "./index";

const foodGeneratorSystem = ({entities}: ISystemParams) =>
  entities.forEach(({ getComponent }: any) => {
    const component = getComponent(componentTypes.FOOD_TIMER);

    /**
     * Generate random components for food
     */
    const getRandomCoordinates = () => ({
      y: Math.floor(Math.random() * appWidth),
      x: Math.floor(Math.random() * appHeight)
    });

    if (component && component.getShouldGenerate()) {
      const foodEntity = entityManager.createEntity();
      const {x, y} = getRandomCoordinates();

      foodEntity.addComponent(eatableComponent());
      foodEntity.addComponent(graphicsComponent(x, y, 10, 0xff0000));
    }
  });

export default {
  system: foodGeneratorSystem,
  dependencies: [componentTypes.FOOD_TIMER]
};
