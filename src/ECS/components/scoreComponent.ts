import componentTypes from "../componentTypes";
import {IRootComponent} from "../../types";

export interface IScoreComponent extends IRootComponent {
  getScore: () => number;
  setScore: (score: number) => number;
}

const scoreComponent = (initialScore = 0): IScoreComponent => {
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
