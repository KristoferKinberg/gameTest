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
  WEED_0 = "WEED_0",
  WEED_1 = "WEED_1",
  WEED_2 = "WEED_2",
  WEED_3 = "WEED_3",
  WEED_4 = "WEED_4",
  WEED_5 = "WEED_5",
  WEED_6 = "WEED_6",
  WEED_7 = "WEED_7",
  WEED_8 = "WEED_8",
  WEED_9 = "WEED_9",
  WEED_10 = "WEED_10",
  WEED_11 = "WEED_11",
  WEED_12 = "WEED_12",
  WEED_13 = "WEED_13",
  WEED_14 = "WEED_14",
  WEED_15 = "WEED_15",
  WEED_16 = "WEED_16",
  WEED_17 = "WEED_17",
  WEED_18 = "WEED_18",
  WEED_19 = "WEED_19",
  WEED_20 = "WEED_20",
  WEED_21 = "WEED_21",
  WEED_22 = "WEED_22",
  WEED_23 = "WEED_23",
  WEED_24 = "WEED_24",
  WEED_25 = "WEED_25",
  WEED_26 = "WEED_26",
  WEED_27 = "WEED_27",
  BUBBLE = "BUBBLE",
  SHARK = "SHARK",
  SQUID = "SQUID",
  WHALE = "WHALE",
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
  [TILE_TYPES.WEED_0]: [1280, 0, 128, 128],
  [TILE_TYPES.WEED_1]: [1408, 0, 128, 128],
  [TILE_TYPES.WEED_2]: [1536, 0, 128, 128],
  [TILE_TYPES.WEED_3]: [1664, 0, 128, 128],
  [TILE_TYPES.WEED_4]: [1792, 0, 128, 128],
  [TILE_TYPES.WEED_5]: [1920, 0, 128, 128],
  [TILE_TYPES.WEED_6]: [2048, 0, 128, 128],
  [TILE_TYPES.WEED_7]: [2176, 0, 128, 128],
  [TILE_TYPES.WEED_8]: [1280, 128, 128, 128],
  [TILE_TYPES.WEED_9]: [1408, 128, 128, 128],
  [TILE_TYPES.WEED_10]: [1536, 128, 128, 128],
  [TILE_TYPES.WEED_11]: [1665, 128, 128, 128],
  [TILE_TYPES.WEED_12]: [1792, 128, 128, 128],
  [TILE_TYPES.WEED_13]: [1920, 128, 128, 128],
  [TILE_TYPES.WEED_14]: [2048, 128, 128, 128],
  [TILE_TYPES.WEED_15]: [2176, 128, 128, 128],
  [TILE_TYPES.WEED_16]: [1280, 256, 128, 128],
  [TILE_TYPES.WEED_17]: [1408, 256, 128, 128],
  [TILE_TYPES.WEED_18]: [1536, 256, 128, 128],
  [TILE_TYPES.WEED_19]: [1664, 256, 128, 128],
  [TILE_TYPES.WEED_20]: [1792, 256, 128, 128],
  [TILE_TYPES.WEED_21]: [1920, 256, 128, 128],
  [TILE_TYPES.WEED_22]: [2048, 256, 128, 128],
  [TILE_TYPES.WEED_23]: [2176, 256, 128, 128],
  [TILE_TYPES.WEED_24]: [1280, 512, 128, 128],
  [TILE_TYPES.WEED_25]: [1408, 512, 128, 128],
  [TILE_TYPES.WEED_26]: [1536, 512, 128, 128],
  [TILE_TYPES.WEED_27]: [1664, 512, 128, 128],
}

const nonTiles = {
  [TILE_TYPES.BUBBLE]: '/assets/bubble.png',
  [TILE_TYPES.SHARK]: '/assets/shark.png',
  [TILE_TYPES.SQUID]: '/assets/squid.png',
  [TILE_TYPES.WHALE]: '/assets/whale.png',
}

export const generateSprite = (type: TILE_TYPES) => {
  if (type === undefined) debugger;
  if (Object.keys(nonTiles).includes(type))
    return PIXI.Sprite.from(nonTiles[type]);

  const texture = getTexture();
  texture.frame = new PIXI.Rectangle(...tiles[type]);

  return new PIXI.Sprite(texture)
}
