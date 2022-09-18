const keys = [
  "Escape",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight"
];

const keyMap = keys.reduce<{ [key: string]: boolean }>((acc, curr) => ({
  ...acc,
  [curr]: false,
}), {});

export default keyMap;
