import mountGraphicsSystem from "./mountGraphicsSystem";
import handleUserInputSystem from "./handleUserInputSystem";
import foodGeneratorSystem from "./foodGeneratorSystem";
import foodTimerSystem from "./foodTimerSystem";
import playerFoodCollision from "./playerFoodCollisionSystem";
import updatePlayerPointsSystem from "./updatePlayerPointsSystem";

export default [
  mountGraphicsSystem,
  handleUserInputSystem,
  foodGeneratorSystem,
  foodTimerSystem,
  playerFoodCollision,
  updatePlayerPointsSystem,
];
