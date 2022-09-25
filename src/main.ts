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

const app = new PIXI.Application({ width: appWidth, height: appHeight });

const playerEntity = entityManager.createEntity();
playerEntity.addComponent(graphicsComponent());
playerEntity.addComponent(playerMovableComponent());
playerEntity.addComponent(scoreComponent());

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

const gameOverEntity = entityManager.createEntity();
gameOverEntity.addComponent(textComponent({
  text: 'GAME OVER',
  id: 'gameOver',
  stage: app.stage,
  x: appWidth-(appWidth/2),
}));

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

  SystemsMananger.runSystems(app, secondsPassed);

  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
