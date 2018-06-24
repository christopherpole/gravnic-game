import { MOVE_LEFT, ENTITIES, levelIsComplete, makeMoves } from '../../index';

describe('Level 18', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#800080', id: 1 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 4 },
          movableEntity: { entityId: ENTITIES.SMART_BOMB, id: 3 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 5 }, movableEntity: null },
        {
          staticEntity: {
            entityId: ENTITIES.COLOR_CHANGER,
            targetEntity: { entityId: ENTITIES.RAINBOW_BLOCK },
            id: 6,
          },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 8 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 7 },
        },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_LEFT]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
