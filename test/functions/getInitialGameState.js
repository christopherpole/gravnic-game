import { ENTITIES, getInitialGameState } from '../../src/';

describe('getInitialGameState()', () => {
  it('Should return the initial game states for the given state', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 3 },
        },
      ],
    ];

    const gameStates = getInitialGameState(gameState);
    expect(gameStates).toMatchSnapshot();
  });
});
