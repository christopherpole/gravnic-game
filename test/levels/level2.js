import {
  MOVE_RIGHT,
  MOVE_DOWN,
  MOVE_NONE,
  ENTITIES,
  levelIsComplete,
  makeMoves,
} from '../../src/index';

describe('Level 2', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.GLASS.id, id: 3 },
        },
        { staticEntity: { id: 5, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 6 },
        },
        { staticEntity: { id: 8, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_NONE, MOVE_RIGHT, MOVE_DOWN]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
