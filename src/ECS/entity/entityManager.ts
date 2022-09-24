import entityGenerator from "./entityGenerator";
import componentTypes from "../componentTypes";

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
  };

  const getEntitiesByComponents = (componentsTypes: componentTypes[]) => Object.values(entities).filter(({ components }) => {
    return components.find(({ getName }) => componentsTypes.includes(getName()))
  });

  const getEntityByComponent = (componentType: componentTypes)  => Object.values(entities).find(({ components }) => {
    return components.some(({ getName }) => getName() === componentType);
  });

  const entityHasComponent = (entity: any, componentType: componentTypes) => {
    return entity.components.some(({ getName }) => getName() === componentType);
  }

  return {
    createEntity,
    getEntities,
    getEntitiesByComponents,
    destroyEntity,
    getEntityByComponent,
    entityHasComponent,
  }
};

const EntityManager = entityManager();
export default EntityManager;
