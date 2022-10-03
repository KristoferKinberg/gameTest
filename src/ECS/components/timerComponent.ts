import componentTypes from "../../../../../Sites/GameTest/src/ECS/componentTypes";

export interface ITimerProps {
  timerId: string;
  endTime: number;
}

export const timerComponent = ({ timerId, endTime }: ITimerProps) => {
  const _name = componentTypes.TIMER;
  const _id = timerId;
  let _endTime = endTime;
  let _timePassed = 0;

  const getId = () => _id;

  const getName = () => _name;

  const setEndTime = (newTime: number) => _endTime = newTime;

  const getEndTime = () => _endTime;

  const setTimePassed = (newTimePassed: number) => {
    if (Number.isNaN(newTimePassed)) return;
    return _timePassed = newTimePassed + _timePassed;
  }

  const getTimePassed = () => _timePassed;

  const reset = () => _timePassed = 0;

  return {
    getName,
    getId,
    setEndTime,
    getEndTime,
    setTimePassed,
    getTimePassed,
    reset,
  }
}

export type ITimerComponent = ReturnType<typeof timerComponent>;
