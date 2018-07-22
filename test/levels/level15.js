import { MOVE_LEFT, ENTITIES, levelIsComplete, makeMoves } from '../../src/index';

describe('Level 15', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.RAINBOW_BLOCK.id, id: 3 },
        },
        { staticEntity: { id: 5, entityId: ENTITIES.BLACK_HOLE.id }, movableEntity: null },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.SMART_BOMB.id, id: 6 },
        },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_LEFT]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(false);
  });
});
