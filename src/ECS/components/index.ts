import {IEatableComponent} from "./eatableComponent";
import {IFoodTimerComponent} from "./foodTimerComponent";
import {IGraphicsComponent} from "./graphicsComponent";
import {IPlayerMovableComponent} from "./playerMoveableComponent";
import {IScoreComponent} from "./scoreComponent";
import {ITextComponent} from "./textComponent";

export type IComponent = IEatableComponent | IFoodTimerComponent |
 IGraphicsComponent | IPlayerMovableComponent | IScoreComponent |
  ITextComponent
