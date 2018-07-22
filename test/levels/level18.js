import { MOVE_LEFT, ENTITIES, levelIsComplete, makeMoves } from '../../src/index';

describe('Level 18', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#800080', id: 1 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 4 },
          movableEntity: { entityId: ENTITIES.SMART_BOMB.id, id: 3 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 5 }, movableEntity: null },
        {
          staticEntity: {
            entityId: ENTITIES.COLOR_CHANGER.id,
            targetEntity: { entityId: ENTITIES.RAINBOW_BLOCK.id },
            id: 6,
          },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 8 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 7 },
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
