import { v4 as uuidv4 } from 'uuid';

const entityGenerator = () => {
  let components: any[] = [];

  const addComponent = (component: any) => {
    components = [
      ...components,
      component,
    ]
  };

  const removeComponent = (componentName: string) => {
    components = components.filter(({ name }) => name !== componentName)
  }

  const getComponent = (componentName: string) =>
    components.find(({ name }) => componentName === name);

  return {
    id: uuidv4(),
    components: [],
    addComponent,
    removeComponent,
    getComponent,
  }
};

const entityManager = () => {
  let entities = {};

  const createEntity = () => {
    const entity = entityGenerator();

    entities = {
      ...entities,
      [entity.id]: entity
    }

    return entity;
  }

  const getEntities = () => entities;

  return {
    createEntity,
    getEntities,
  }
};

export default entityManager();
