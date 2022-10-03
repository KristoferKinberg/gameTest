import {appHeight, appWidth} from "../constants";
import {generateSprite, TILE_TYPES, tileHeight, tileWidth} from "./tileMap";
import * as PIXI from "pixi.js";

const floorTiles = [
  TILE_TYPES.FLOOR0,
  TILE_TYPES.FLOOR1,
  TILE_TYPES.FLOOR2,
  TILE_TYPES.FLOOR3,
  TILE_TYPES.FLOOR4,
  TILE_TYPES.FLOOR5,
  TILE_TYPES.FLOOR6,
  TILE_TYPES.FLOOR7,
];

const WEED = 'WEED';
const weedPerTile = 2;

export const weedSprites = Object.keys(TILE_TYPES).filter((key) => key.includes(WEED));

export default (app: PIXI.Application) => setTimeout(() => {
  const container = new PIXI.Container();
  container.sortableChildren = true;

  const rows = Math.round(appWidth / tileWidth);
  const columns = Math.round(appHeight / tileHeight);

  for (let i = 0; i < rows+1; i++){
    for (let j = 0; j < columns; j++){
      const oceanSprite = generateSprite(TILE_TYPES.OCEAN);
      oceanSprite.position.x = i * tileWidth;
      oceanSprite.position.y = j * tileHeight;
      container.addChild(oceanSprite);
    }

    const floorSprite = generateSprite(floorTiles[(i+1)%floorTiles.length]);
    floorSprite.zIndex = 1;
    floorSprite.position.x = i * tileWidth;
    floorSprite.position.y = appHeight - tileWidth;
    container.addChild(floorSprite);
  }

  for(let i = 0; i < (weedPerTile*columns); i++) {
    const minWeedSize = 75;
    const maxWeedSize = 225;
    const size = Math.floor(Math.random() * (minWeedSize - maxWeedSize + 1) + maxWeedSize);
    const lowestSpritePlacement = 25 + 128;
    const randomIndex = Math.round(Math.random() * (weedSprites.length - 1));
    const randomX = Math.round(Math.random() * appWidth);
    const randomY = appHeight - lowestSpritePlacement - Math.round(Math.random() * 50);
    const weedSprite = generateSprite(weedSprites[randomIndex]);

    weedSprite.height = size;
    weedSprite.width = size;
    weedSprite.position.x = randomX;
    weedSprite.position.y = randomY - (size - 128);
    weedSprite.zIndex = 300 - (appHeight - randomY);

    container.addChild(weedSprite);

    app.stage.addChild(container);
  }
}, 75)
