import './style.css'
import * as PIXI from 'pixi.js'
import player from "./player";
import keys from "./keymap";
import food from "./food";

const appWidth = 900;
const appHeight = 750;
const app = new PIXI.Application({ width: appWidth, height: appHeight });
const playerObj = player();
const dummyObj = player(100, 100, 20, 0x00ff00);

app.stage.addChild(playerObj);
app.stage.addChild(dummyObj);

document
  .getElementById('game')
  ?.appendChild(app.view);

let secondsPassed: number;
let oldTimeStamp: any;
let fps: number;
let stop = false;
let foodTimer = 0;

const keyMap = keys.reduce<{ [key: string]: boolean }>((acc, curr) => ({
  ...acc,
  [curr]: false,
}), {});

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

const isTopEdgeOfScreen = () => {
  const yPosition = playerObj.getBounds().y;
  return (yPosition - 3) < 0;
}

const isBottomEdgeOfScreen = () => {
  const yPosition = playerObj.getBounds().y;
  return (yPosition + playerObj.height + 3) > appHeight;
}

const isLeftEdgeOfScreen = () => {
  const xPosition = playerObj.getBounds().x;
  return (xPosition - 3) < 0;
}

const isRightEdgeOfScreen = () => {
  const xPosition = playerObj.getBounds().x;
  return (xPosition + playerObj.width + 3) > appWidth;
}

const getDistanceBetweenPoints = (x1: number, x2: number, y1: number, y2: number) => {
  const x = x1 - x2;
  const y = y1 - y2;
  const sqrRoot = (x*x) + (y*y);

  return Math.sqrt(sqrRoot);
};

const getObjectCenterCords = (obj: PIXI.Graphics) => {
  const { x, y, width } = obj.getBounds();
  return {
    x: x + (width / 2),
    y: y + (width / 2)
  }
}

const didCollide = (obj1: PIXI.Graphics, obj2: PIXI.Graphics) => {
  const { x: obj1x, y: obj1y } = getObjectCenterCords(obj1);
  const { x: obj2x, y: obj2y } = getObjectCenterCords(obj2);

  const distance = getDistanceBetweenPoints(obj1x, obj2x, obj1y, obj2y);
  const maxPossibleDistance = (obj1.width / 2) + (obj2.width / 2);

  return maxPossibleDistance > distance;
}

const handleInput = (secondsPassed: number) => {
  if (keyMap.Escape) stop = true;

  if (keyMap.ArrowUp && !isTopEdgeOfScreen())
    playerObj.position.y = playerObj.getGlobalPosition().y - 2;

  if (keyMap.ArrowDown && !isBottomEdgeOfScreen())
    playerObj.position.y = playerObj.getGlobalPosition().y + 2;

  if (keyMap.ArrowLeft && !isLeftEdgeOfScreen())
    playerObj.position.x = playerObj.getGlobalPosition().x - 2;

  if (keyMap.ArrowRight && !isRightEdgeOfScreen())
    playerObj.position.x = playerObj.getGlobalPosition().x + 2;

  if (foodTimer === 50) {
    //spawnRandomFood();

    foodTimer = 0;
  }
  console.log(didCollide(playerObj, dummyObj));

  foodTimer++;
};

const gameLoop = (timeStamp: any) => {
  if (stop) return;
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  //console.log('loop run: ', fps, secondsPassed);
  //playerObj.position.x = playerObj.getGlobalPosition().x + 1;
  handleInput(secondsPassed);
  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
