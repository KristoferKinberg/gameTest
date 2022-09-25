import './style.css'
import * as PIXI from 'pixi.js'
import entityManager from "./ECS/entity/entityManager";
import graphicsComponent from "./ECS/components/graphicsComponent";
import playerMovableComponent from "./ECS/components/playerMoveableComponent";
import keyMap from "./keymap";
import {appHeight, appWidth} from "./constants";
import foodTimerComponent from "./ECS/components/foodTimerComponent";
import SystemsMananger from './ECS/systems'
import scoreComponent from "./ECS/components/scoreComponent";
import textComponent from "./ECS/components/textComponent";
import gameRunningComponent, {IGameRunningComponent} from "./ECS/components/gameRunningComponent";
import componentTypes from "./ECS/componentTypes";
import speedComponent from "./ECS/components/speedComponent";

const app = new PIXI.Application({ width: appWidth, height: appHeight });

const playerEntity = entityManager.createEntity();
const r = 30;
playerEntity.addComponent(graphicsComponent({
  x: (appWidth / 2) - r,
  y: (appHeight / 2) - r,
  r,
}));
playerEntity.addComponent(playerMovableComponent());
playerEntity.addComponent(scoreComponent());
playerEntity.addComponent(speedComponent());

const scoreEntity = entityManager.createEntity();
scoreEntity.addComponent(textComponent({
  text: 'Score: ',
  id: 'scoreText',
  stage: app.stage,
  x: 200,
}));
scoreEntity.addComponent(textComponent({
  text: '0',
  id: 'scoreValue',
  stage: app.stage,
  x: 275
}));

const gameEntity = entityManager.createEntity();
gameEntity.addComponent(foodTimerComponent());
gameEntity.addComponent(gameRunningComponent({ running: true }));

document
  .getElementById('game')
  ?.appendChild(app.view);

let secondsPassed: number;
//let fps: number;
let oldTimeStamp: any;

/**window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') stop = true
});*/

window.addEventListener('keydown', (e) => keyMap[e.key] = true);
window.addEventListener('keyup', (e) => keyMap[e.key] = false);

const gameLoop = (timeStamp: any) => {
  const gameEntity = entityManager.getEntityByComponent(componentTypes.GAME_RUNNING);
  const gameRunning = gameEntity.getComponent<IGameRunningComponent>(componentTypes.GAME_RUNNING).isRunning();

  if (!gameRunning) return;

  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  SystemsMananger.runSystems(app, secondsPassed);

  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
