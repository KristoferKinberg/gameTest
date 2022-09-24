import componentTypes from "./ECS/componentTypes";

export interface IRootComponent {
  getName: () => componentTypes;
}
