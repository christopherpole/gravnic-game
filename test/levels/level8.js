import { MOVE_LEFT, MOVE_NONE, ENTITIES, levelIsComplete, makeMoves } from '../../src/index';

describe('Level 8', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        { staticEntity: { id: 1, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        {
          staticEntity: { id: 3, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 2 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 4 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: { id: 6, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 8, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#008000', id: 7 },
        },
        { staticEntity: { id: 9, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        {
          staticEntity: { id: 11, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#008000', id: 10 },
        },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_NONE, MOVE_LEFT]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
