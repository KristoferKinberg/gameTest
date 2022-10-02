import {v4 as uuidv4} from "uuid";
import EntityManager from "./entityManager";
import componentTypes from "../componentTypes";
import {IComponent} from "../components";

export interface IEntity {
  id: string;
  components: IComponent[];
  getComponent<Component>(componentType: componentTypes): Component | undefined;
  addComponent<Component>(component: IComponent): Component;
  removeComponent(componentName: componentTypes): void;
  removeComponents(...componentsNames: componentTypes[]): void;
  hasComponent(componentName: componentTypes): boolean;
  destroy(): void;
}

const entityGenerator = (): IEntity => {
  const id = uuidv4();
  let components: IComponent[] = [];

  const addComponent = (component: Component) => {
    components.push(component);
    return component;
  }

  const removeComponent = (componentName: componentTypes) => {
    components = components.filter(({ getName }) => getName() !== componentName)
  }

  const removeComponents = (...componentsTypes: componentTypes[]) => {
    componentsTypes.forEach(removeComponent);
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
    removeComponents,
  }
};

export default entityGenerator;
