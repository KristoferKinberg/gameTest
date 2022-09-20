import { v4 as uuidv4 } from 'uuid';

const entityGenerator = () => {
  const id = uuidv4();
  let components: any[] = [];

  const addComponent = (component: any) => {
    components.push(component)
    return;
    components = [
      ...components,
      component,
    ]
  };

  const removeComponent = (componentName: string) => {
    components = components.filter(({ name }) => name !== componentName)
  }

  const getComponent = (componentName: string) => {
    return components.find(({ name }) => componentName === name);

  }

  const destroy = () => {
    EntityManager.destroyEntity(id);
  }

  return {
    id,
    components,
    addComponent,
    removeComponent,
    getComponent,
    destroy,
  }
};

interface IEntities {
  [key: string]: any;
}

const entityManager = () => {
  let entities: IEntities = {};

  const createEntity = () => {
    const entity = entityGenerator();
    entities[entity.id] = entity;
    return entity;
  }

  const getEntities = () => entities;

  const destroyEntity = (id: string) => {
    const { [id]: entityToRemove, ...rest } = entities;
    entities = rest;
  }

  const getEntitiesByComponents = (componentsTypes: string[]) => Object.values(entities).filter(({ components }) => {
    return components.find(({ name }) => componentsTypes.includes(name))
  })

  return {
    createEntity,
    getEntities,
    getEntitiesByComponents,
    destroyEntity,
  }
};

const EntityManager = entityManager();
export default EntityManager;
