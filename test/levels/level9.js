import { MOVE_RIGHT, ENTITIES, levelIsComplete, makeMoves } from '../../src/index';

describe('Level 9', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
      ],
      [
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 3 },
        },
        {
          staticEntity: { id: 6, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FFFF00', id: 5 },
        },
        { staticEntity: { id: 7, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 8, entityId: ENTITIES.BLACK_HOLE.id }, movableEntity: null },
        { staticEntity: { id: 9, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 10, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_RIGHT]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
