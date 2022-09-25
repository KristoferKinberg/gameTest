import {v4 as uuidv4} from "uuid";
import EntityManager from "./entityManager";
import componentTypes from "../componentTypes";
import {IComponent} from "../components";

const entityGenerator = () => {
  const id = uuidv4();
  let components: IComponent[] = [];

  const addComponent = (component: any) => components.push(component)

  const removeComponent = (componentName: componentTypes) => {
    components = components.filter(({ getName }) => getName() !== componentName)
  }

  const getComponent = (componentName: componentTypes) =>
    components.find(({ getName }) => componentName === getName());

  const hasComponent = (componentName: componentTypes) =>
    components.some(({ getName }) => getName() === componentName);

  const destroy = () => EntityManager.destroyEntity(id);

  return {
    id,
    components,
    addComponent,
    removeComponent,
    getComponent,
    hasComponent,
    destroy,
  }
};

export default entityGenerator;
