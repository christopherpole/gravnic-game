import { ENTITIES, unstickCrates } from '../../src/';

describe('unstickCrates()', () => {
  const gameState = [
    [
      {
        staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
        movableEntity: { entityId: ENTITIES.CRATE.id, id: 1, moved: true },
      },
      {
        staticEntity: { entityId: ENTITIES.FLOOR.id, id: 4 },
        movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 3 },
      },
    ],
    [
      { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 5 }, movableEntity: null },
      {
        staticEntity: { entityId: ENTITIES.FLOOR.id, id: 7 },
        movableEntity: { entityId: ENTITIES.CRATE.id, id: 6 },
      },
    ],
  ];

  const expectedGameState = [
    [
      {
        staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
        movableEntity: { entityId: ENTITIES.CRATE.id, id: 1 },
      },
      {
        staticEntity: { entityId: ENTITIES.FLOOR.id, id: 4 },
        movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 3 },
      },
    ],
    [
      { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 5 }, movableEntity: null },
      {
        staticEntity: { entityId: ENTITIES.FLOOR.id, id: 7 },
        movableEntity: { entityId: ENTITIES.CRATE.id, id: 6 },
      },
    ],
  ];

  it('Should return the given game state if the move does not result in changes', () => {
    let updatedGameState = unstickCrates(gameState);

    expect(updatedGameState).toEqual({
      finished: false,
      newGameState: expectedGameState,
    });

    updatedGameState = unstickCrates(updatedGameState.newGameState);

    expect(updatedGameState).toEqual({
      finished: true,
      newGameState: expectedGameState,
    });
  });
});
