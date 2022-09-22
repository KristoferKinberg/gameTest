import {v4 as uuidv4} from "uuid";
import EntityManager from "./entityManager";

const entityGenerator = () => {
  const id = uuidv4();
  let components: any[] = [];

  const addComponent = (component: any) => components.push(component)

  const removeComponent = (componentName: string) => {
    components = components.filter(({ name }) => name !== componentName)
  }

  const getComponent = (componentName: string) =>
    components.find(({ name }) => componentName === name);

  const destroy = () => EntityManager.destroyEntity(id);

  return {
    id,
    components,
    addComponent,
    removeComponent,
    getComponent,
    destroy,
  }
};

export default entityGenerator;
