import { MOVE_LEFT, ENTITIES, levelIsComplete, makeMoves } from '../../index';

describe('Level 15', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.RAINBOW_BLOCK, id: 3 },
        },
        { staticEntity: { id: 5, entityId: ENTITIES.BLACK_HOLE }, movableEntity: null },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.SMART_BOMB, id: 6 },
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
