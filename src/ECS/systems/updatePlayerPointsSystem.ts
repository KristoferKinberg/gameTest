import entityManager from "../entity/entityManager";
import componentTypes from "../componentTypes";


const updatePlayerPointsSystem = () => {
  const textHoldingEntities = entityManager.getEntitiesByComponents([componentTypes.TEXT]);
  const playerEntity = entityManager.getEntityByComponent(componentTypes.PLAYER_MOVABLE);

  textHoldingEntities
    .forEach(({ components }) => {
      return components.forEach((component: any) => {
        if (component.getId() === 'scoreValue') {
          const scoreComponent = playerEntity.components
            .find(({ getName }: any) => getName() === componentTypes.SCORE);
          component.setText(scoreComponent.getScore())
        }
      });
    });
}

export default updatePlayerPointsSystem;
