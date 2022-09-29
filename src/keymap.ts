export const keys = [
  "Escape",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight"
];

export const KEYS = {
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
}

const keyMap = Object.values(KEYS).reduce<{ [key: string]: boolean }>((acc, curr) => ({
  ...acc,
  [curr]: false,
}), {});

export default keyMap;
