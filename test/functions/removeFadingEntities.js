import { ENTITIES, removeFadingEntities } from '../../src/';

describe('removeFadingEntities()', () => {
  it('Should leave a game state with no fading entities the same', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 }, movableEntity: null },
      ],
    ];

    const newGameState = removeFadingEntities(gameState);

    expect(newGameState).toEqual({
      fading: false,
      gameState: newGameState.gameState,
    });
  });

  it('Should remove any fading movable entities', () => {
    const gameState = [
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
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 }, movableEntity: null },
      ],
    ];

    const expectedGameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 },
          movableEntity: null,
        },
      ],
    ];

    const newGameState = removeFadingEntities(gameState);

    expect(newGameState).toEqual({
      fading: true,
      gameState: expectedGameState,
    });
  });

  it('Should remove any fading shrinking entities', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: {
            entityId: ENTITIES.BLOCK.id,
            color: '#ff0000',
            shrinking: true,
            id: 1,
          },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 }, movableEntity: null },
      ],
    ];

    const expectedGameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 },
          movableEntity: null,
        },
      ],
    ];

    const newGameState = removeFadingEntities(gameState);

    expect(newGameState).toEqual({
      fading: true,
      gameState: expectedGameState,
    });
  });

  it('Should replace a shrinking black hole with a floor entity', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.BLACK_HOLE.id, shrinking: true, id: 1 },
          movableEntity: null,
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 }, movableEntity: null },
      ],
    ];

    const expectedGameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 1 },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: null,
        },
      ],
    ];

    const newGameState = removeFadingEntities(gameState);

    expect(newGameState).toEqual({
      fading: true,
      gameState: expectedGameState,
    });
  });
});
