import entityGenerator, {IEntity} from "./entityGenerator";
import componentTypes from "../componentTypes";

export interface IEntities {
  [key: string]: IEntity;
}

const entityManager = () => {
  let entities: IEntities = {};

  const createEntity = () => {
    const entity = entityGenerator();
    entities[entity.id] = entity;
    return entity;
  }

  const getEntities = () => entities;

  const getEntititesAsArray = () => Object.values(entities);

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

  const entityHasComponent = (entity: IEntity, componentType: componentTypes) => {
    return entity.components.some(({ getName }) => getName() === componentType);
  }

  const getUsedComponentTypes = () => {
    const uniques = Object.values(entities).reduce((acc, curr) => {
      return acc.add(curr.components.map(({ getName }) => getName()));
    }, new Set())

    return [...uniques].flat();
  };

  return {
    createEntity,
    getEntities,
    getEntititesAsArray,
    getEntitiesByComponents,
    destroyEntity,
    getEntityByComponent,
    entityHasComponent,
    getUsedComponentTypes,
  }
};

const EntityManager = entityManager();
export default EntityManager;
