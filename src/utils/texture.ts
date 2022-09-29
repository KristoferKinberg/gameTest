import * as PIXI from "pixi.js";

const texture = PIXI.Texture.from('/assets/tileSheet.png');

export const getTexture = () => texture.clone();
