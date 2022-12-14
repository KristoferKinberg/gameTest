import {IEatableComponent} from "./eatableComponent";
import {IFoodTimerComponent} from "./foodTimerComponent";
import {IGraphicsComponent} from "./graphicsComponent";
import {IPlayerMovableComponent} from "./playerMoveableComponent";
import {IScoreComponent} from "./scoreComponent";
import {ITextComponent} from "./textComponent";
import { IDirectionComponent } from "./directionComponent";

export type IComponent = IEatableComponent | IFoodTimerComponent |
 IGraphicsComponent | IPlayerMovableComponent | IScoreComponent |
  ITextComponent | IDirectionComponent
