import { ENTITIES, fadeEntities } from '../../src/';

describe('fadeEntities()', () => {
  it('Returns the game state as is if there are no entities to fade', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 4 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FF8C00', id: 3 },
        },
      ],
    ];
    const result = fadeEntities(gameState);

    expect(result).toEqual({
      finished: true,
      newGameState: gameState,
    });
  });

  it('Returns the updated game state if ther are entities to fade', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 4 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 3 },
        },
      ],
    ];
    const expectedGameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: {
            entityId: ENTITIES.BLOCK.id,
            color: '#ff0000',
            fading: true,
            id: 1,
          },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 4 },
          movableEntity: {
            entityId: ENTITIES.BLOCK.id,
            color: '#ff0000',
            fading: true,
            id: 3,
          },
        },
      ],
    ];
    const result = fadeEntities(gameState);

    expect(result).toEqual({
      finished: false,
      newGameState: expectedGameState,
    });
  });
});
