import mountGraphicsSystem from "./mountGraphicsSystem";
import handleUserInputSystem from "./handleUserInputSystem";
import foodGeneratorSystem from "./foodGeneratorSystem";
import foodTimerSystem from "./foodTimerSystem";
import playerFoodCollision from "./playerFoodCollisionSystem";
import updatePlayerPointsSystem from "./updatePlayerPointsSystem";
import moveEatableSystems from "./moveEatableSystem";
import componentTypes from "../componentTypes";
import EntityManager from "../entity/entityManager";
import * as PIXI from 'pixi.js'
import {IEntity} from "../entity/entityGenerator";
import speedSystem from "./speedSystem";
import timerSystem from "./bubbleGeneratorSystem";
import bubbleMoverSystem from "./bubbleMoverSystem";

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
    moveEatableSystems,
    speedSystem,
    timerSystem,
    bubbleMoverSystem
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
