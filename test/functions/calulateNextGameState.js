import { MOVE_UP, ENTITIES, calulateNextGameState } from '../../src/';

describe('calulateNextGameState()', () => {
  let gameState = [
    [{ staticEntity: { id: 1, entityId: ENTITIES.FLOOR.id }, movableEntity: null }],
    [{ staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id }, movableEntity: null }],
    [
      {
        staticEntity: { id: 4, entityId: ENTITIES.FLOOR.id },
        movableEntity: { id: 3, entityId: ENTITIES.BLOCK.id },
      },
    ],
  ];

  it('Should return the next game state', () => {
    //  Move 1
    gameState = calulateNextGameState(gameState, MOVE_UP);
    expect(gameState.gameState).toMatchSnapshot();

    //  Move 2
    gameState = calulateNextGameState(gameState.gameState, MOVE_UP);
    expect(gameState.gameState).toMatchSnapshot();
  });

  it('Should return false if the entities cannot move any further', () => {
    gameState = calulateNextGameState(gameState.gameState, MOVE_UP);
    expect(gameState.gameState).toBe(false);
  });
});
