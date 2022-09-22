import entityManager from "../entity/entityManager";
import componentTypes from "../componentTypes";


const updatePlayerPointsSystem = () => {
  const textHoldingEntities = entityManager.getEntitiesByComponents([componentTypes.TEXT]);
  const playerEntity = entityManager.getEntityByComponent(componentTypes.PLAYER_MOVABLE);

  textHoldingEntities
    .forEach(({ components }) => {
      return components.forEach((component: any) => {
        if (component.id === 'scoreValue') {
          const scoreComponent = playerEntity.components
            .find(({ name }: any) => name === componentTypes.SCORE);

          console.log(scoreComponent);
          component.textObj.text = scoreComponent.score;
        }
      });
    });
}

export default updatePlayerPointsSystem;
