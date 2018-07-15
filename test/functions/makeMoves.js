import { ENTITIES, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT, MOVE_UP, makeMoves } from '../../src/';

describe('makeMoves()', () => {
  it('Should return an array of game states for the given moves', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
        },
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: { id: 4, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 5, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT, MOVE_UP]);
    expect(gameStates).toMatchSnapshot();
  });
});
