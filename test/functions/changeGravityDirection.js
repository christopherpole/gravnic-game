import { MOVE_UP, MOVE_DOWN, ENTITIES, changeGravityDirection } from '../../src/';

describe('changeGravityDirection()', () => {
  const gameState = [
    [{ staticEntity: { id: 1, entityId: ENTITIES.FLOOR }, movableEntity: null }],
    [{ staticEntity: { id: 2, entityId: ENTITIES.FLOOR }, movableEntity: null }],
    [
      {
        staticEntity: { id: 4, entityId: ENTITIES.FLOOR },
        movableEntity: { id: 3, entityId: ENTITIES.BLOCK },
      },
    ],
  ];

  it('Should return the given game state if the move does not result in changes', () => {
    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);

    expect(gameStates).toEqual([gameState]);
  });

  it('Should return an array of all game states from the move', () => {
    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
  });
});
