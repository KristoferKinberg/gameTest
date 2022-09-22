import entityGenerator from "./entityGenerator";

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

  const getEntityByComponent = (componentType: string)  => Object.values(entities).find(({ components }) => {
    return components.some(({ name }) => name === componentType);
  })

  return {
    createEntity,
    getEntities,
    getEntitiesByComponents,
    destroyEntity,
    getEntityByComponent,
  }
};

const EntityManager = entityManager();
export default EntityManager;
