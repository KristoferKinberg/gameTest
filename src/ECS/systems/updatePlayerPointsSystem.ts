import entityManager from "../entity/entityManager";
import componentTypes from "../componentTypes";
import {IScoreComponent} from "../components/scoreComponent";

const updatePlayerPointsSystem = () => {
  const textHoldingEntities = entityManager.getEntitiesByComponents([componentTypes.TEXT]);
  const playerEntity = entityManager.getEntityByComponent(componentTypes.PLAYER_MOVABLE);

  textHoldingEntities
    .forEach(({ components }) => {
      return components.forEach((component: any) => {
        if (component.getId() === 'scoreValue' && playerEntity) {
          const scoreComponent: (IScoreComponent | undefined) = playerEntity.components
            .find(({ getName }: any) => getName() === componentTypes.SCORE);

          if (scoreComponent) component.setText(scoreComponent.getScore())
        }
      });
    });
}

export default {
  system: updatePlayerPointsSystem,
  dependencies: [componentTypes.TEXT, componentTypes.PLAYER_MOVABLE]
};
