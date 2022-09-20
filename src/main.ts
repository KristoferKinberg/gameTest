import './style.css'
import * as PIXI from 'pixi.js'
import entityManager from "./ECS/entityManager";
import graphicsComponent from "./ECS/components/graphicsComponent";
import playerMovableComponent from "./ECS/components/playerMoveableComponent";
import keyMap from "./keymap";
import {appHeight, appWidth} from "./constants";
import foodTimerComponent from "./ECS/components/foodTimerComponent";
import systems from './ECS/systems'
import scoreComponent from "./ECS/components/scoreComponent";

const app = new PIXI.Application({ width: appWidth, height: appHeight });

const playerEntity = entityManager.createEntity();
playerEntity.addComponent(graphicsComponent());
playerEntity.addComponent(playerMovableComponent());
playerEntity.addComponent(scoreComponent());

const gameEntity = entityManager.createEntity();
gameEntity.addComponent(foodTimerComponent());

document
  .getElementById('game')
  ?.appendChild(app.view);

let secondsPassed: number;
//let fps: number;
let oldTimeStamp: any;
let stop = false;

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') stop = true
});

window.addEventListener('keydown', (e) => keyMap[e.key] = true);
window.addEventListener('keyup', (e) => keyMap[e.key] = false);

const gameLoop = (timeStamp: any) => {
  if (stop) return;

  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  systems.forEach((system: any) => {
    system(Object.values(entityManager.getEntities()), app);
  })

  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
