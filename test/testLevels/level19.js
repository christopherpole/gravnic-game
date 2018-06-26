import { MOVE_DOWN, MOVE_RIGHT, ENTITIES, levelIsComplete, makeMoves } from '../../src/index';

describe('Level 19', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 2 },
          movableEntity: { entityId: ENTITIES.RAINBOW_BLOCK, id: 1 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: {
            entityId: ENTITIES.COLOR_CHANGER,
            targetEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000' },
            id: 3,
          },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 5 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#FF8C00', id: 4 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 6 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 7 }, movableEntity: null },
        {
          staticEntity: {
            entityId: ENTITIES.COLOR_CHANGER,
            targetEntity: { entityId: ENTITIES.BLOCK, color: '#800080' },
            id: 8,
          },
          movableEntity: null,
        },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 9 }, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_DOWN, MOVE_RIGHT]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
