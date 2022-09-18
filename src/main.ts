import './style.css'
import * as PIXI from 'pixi.js'
import player from "./player";
import food from "./food";
import entityManager from "./ECS/entityManager";
import graphicsComponent from "./ECS/components/graphicsComponent";
import mountGraphicsSystem from "./ECS/systems/mountGraphicsSystem";
import didCollide from "./utils/collision";
import playerMovableComponent from "./ECS/components/playerMoveableComponent";
import keyMap from "./keymap";
import {appHeight, appWidth} from "./constants";
import handleUserInputSystem from "./ECS/systems/handleUserInput";

const app = new PIXI.Application({ width: appWidth, height: appHeight });
const playerObj = player();
const dummyObj = player(100, 100, 20, 0x00ff00);

app.stage.addChild(dummyObj);

const playerEntity = entityManager.createEntity();
playerEntity.addComponent(graphicsComponent());
playerEntity.addComponent(playerMovableComponent());

const systems = [
  mountGraphicsSystem,
  handleUserInputSystem
]

document
  .getElementById('game')
  ?.appendChild(app.view);

let secondsPassed: number;
let oldTimeStamp: any;
let fps: number;
let stop = false;
let foodTimer = 0;

window.addEventListener('keydown', (e) => {
  keyMap[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  keyMap[e.key] = false;
});

const spawnRandomFood = () => {
  const foodObj = food();
  const y = Math.floor(Math.random() * appWidth);
  const x = Math.floor(Math.random() * appHeight);

  foodObj.position.y = y;
  foodObj.position.x = x;

  app.stage.addChild(foodObj);
}

const gameLoop = (timeStamp: any) => {
  if (stop) return;

  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  systems.forEach((system: any) => {
    system(Object.values(entityManager.getEntities()), app);
  })

  if (foodTimer === 50) {
    //spawnRandomFood();

    foodTimer = 0;
  }
  console.log(didCollide(playerObj, dummyObj));

  foodTimer++;

  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
