import componentTypes from "../componentTypes";

const scoreComponent = (initialScore = 0) => {
  const _name = componentTypes.SCORE;
  let _score = initialScore;

  const getName = () => _name;

  const getScore = () => _score;

  const setScore = (score: number) => _score = score;

  return {
    getName,
    getScore,
    setScore,
  }
};

export default scoreComponent;
