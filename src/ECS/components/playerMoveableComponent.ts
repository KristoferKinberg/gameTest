import componentTypes from "../componentTypes";

const playerMovableComponent = () => {
  const _name = componentTypes.PLAYER_MOVABLE;

  const getName = () => _name;

  return {
    getName
  }
};

export default playerMovableComponent;
