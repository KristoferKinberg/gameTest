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
]

export default (app: PIXI.Application) => setTimeout(() => {
  const rows = Math.round(appWidth / tileWidth);
  const columns = Math.round(appHeight / tileHeight);

  for (let i = 0; i < rows+1; i++){
    for (let j = 0; j < columns; j++){
      const oceanSprite = generateSprite(TILE_TYPES.OCEAN);
      oceanSprite.position.x = i * tileWidth;
      oceanSprite.position.y = j * tileHeight;
      app.stage.addChild(oceanSprite);
    }

    const floorSprite = generateSprite(floorTiles[(i+1)%floorTiles.length]);
    floorSprite.zIndex = 1;
    floorSprite.position.x = i * tileWidth;
    floorSprite.position.y = appHeight - tileWidth;
    app.stage.addChild(floorSprite);
  }
}, 75)
