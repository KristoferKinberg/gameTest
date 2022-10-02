import {getTexture} from "./texture";
import * as PIXI from "pixi.js";

export const tileWidth = 128;
export const tileHeight = 128;

export enum TILE_TYPES {
  GREEN_SMALL = 'GREEN_SMALL',
  GREEN_LARGE = 'GREEN_LARGE',
  GREEN_BONE = 'GREEN_BONE',
  PURPLE_SMALL = 'PURPLE_SMALL',
  PURPLE_LARGE = 'PURPLE_LARGE',
  PURPLE_BONE = 'PURPLE_BONE',
  BLUE_SMALL = 'BLUE_SMALL',
  BLUE_LARGE = 'BLUE_LARGE',
  BLUE_BONE = 'BLUE_BONE',
  RED_SMALL = 'RED_SMALL',
  RED_LARGE = 'RED_LARGE',
  RED_BONE = 'RED_BONE',
  ORANGE_BONE = 'ORANGE_BONE',
  ORANGE_SMALL = 'ORANGE_SMALL',
  ORANGE_LARGE = 'ORANGE_LARGE',
  OCEAN = 'OCEAN',
  FLOOR0 = 'FLOOR0',
  FLOOR1 = 'FLOOR1',
  FLOOR2 = 'FLOOR2',
  FLOOR3 = 'FLOOR3',
  FLOOR4 = 'FLOOR4',
  FLOOR5 = 'FLOOR5',
  FLOOR6 = 'FLOOR6',
  FLOOR7 = 'FLOOR7',
}

const floorCords = {
  lightKFloorY: 0,
  darKFloorY: 256,
}

export const tiles = {
  [TILE_TYPES.GREEN_LARGE]: [10 ,540, 108, 76],
  [TILE_TYPES.GREEN_SMALL]: [134, 535, 116, 85],
  [TILE_TYPES.GREEN_BONE]: [10 ,665, 108, 76],
  [TILE_TYPES.PURPLE_SMALL]: [281, 553, 78, 46],
  [TILE_TYPES.PURPLE_LARGE]: [405, 549, 86, 54],
  [TILE_TYPES.PURPLE_BONE]: [281, 680, 78, 46],
  [TILE_TYPES.BLUE_SMALL]: [519, 543, 114, 66],
  [TILE_TYPES.BLUE_LARGE]: [643, 539, 122, 74],
  [TILE_TYPES.BLUE_BONE]: [519, 670, 114, 66],
  [TILE_TYPES.RED_SMALL]: [776, 531, 113, 89],
  [TILE_TYPES.RED_LARGE]: [900, 528, 120, 96],
  [TILE_TYPES.RED_BONE]: [776, 657, 113, 89],
  [TILE_TYPES.ORANGE_SMALL]: [1035, 547, 107, 59],
  [TILE_TYPES.ORANGE_LARGE]: [1158, 542, 116, 68],
  [TILE_TYPES.ORANGE_BONE]: [1035, 680, 107, 59],
  [TILE_TYPES.OCEAN]: [2176, 512, 128, 128],
  [TILE_TYPES.FLOOR0]: [384, floorCords.darKFloorY, 128, 128],
  [TILE_TYPES.FLOOR1]: [512, floorCords.darKFloorY, 128, 128],
  [TILE_TYPES.FLOOR2]: [640, floorCords.darKFloorY, 128, 128],
  [TILE_TYPES.FLOOR3]: [768, floorCords.darKFloorY, 128, 128],
  [TILE_TYPES.FLOOR4]: [896, floorCords.darKFloorY, 128, 128],
  [TILE_TYPES.FLOOR5]: [1024, floorCords.darKFloorY, 128, 128],
  [TILE_TYPES.FLOOR6]: [1152, floorCords.darKFloorY, 128, 128],
  [TILE_TYPES.FLOOR7]: [896, floorCords.darKFloorY, 128, 128],
}

export const generateSprite = (type: TILE_TYPES) => {
  const texture = getTexture();

  texture.frame = new PIXI.Rectangle(...tiles[type]);
  return new PIXI.Sprite(texture);
}
