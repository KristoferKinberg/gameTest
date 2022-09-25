import mountGraphicsSystem from "./mountGraphicsSystem";
import handleUserInputSystem from "./handleUserInputSystem";
import foodGeneratorSystem from "./foodGeneratorSystem";
import foodTimerSystem from "./foodTimerSystem";
import playerFoodCollision from "./playerFoodCollisionSystem";
import updatePlayerPointsSystem from "./updatePlayerPointsSystem";
import componentTypes from "../componentTypes";
import EntityManager, {IEntity} from "../entity/entityManager";
import * as PIXI from 'pixi.js'

export interface ISystemParams {
  entities: IEntity[],
  app: PIXI.Application,
  secondsPassed: number;
}

type ISystem = (systemParams: ISystemParams) => void;

interface IRegisterSystem {
  system: ISystem;
  dependencies: componentTypes[];
}

export const systemsManager = () => {
  let systems: IRegisterSystem[] = [
    mountGraphicsSystem,
    handleUserInputSystem,
    foodGeneratorSystem,
    foodTimerSystem,
    playerFoodCollision,
    updatePlayerPointsSystem,
  ];

  const requiredComponentsAreInUse = (dependencies: componentTypes[]) => {
    const usedComponents = EntityManager.getUsedComponentTypes();
    return dependencies.every((dependency) => usedComponents.includes(dependency));
  }

  const runSystems = (app: PIXI.Application, secondsPassed: number) => {
    systems.forEach(({ system, dependencies }) => {
      if (!dependencies.length || requiredComponentsAreInUse(dependencies)) {
        system({
          entities: Object.values(EntityManager.getEntities()),
          app,
          secondsPassed,
        });
      }
    });
  }

  return { runSystems }
}

export default systemsManager();
