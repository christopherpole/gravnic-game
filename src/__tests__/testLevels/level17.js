import { MOVE_DOWN, ENTITIES, levelIsComplete, makeMoves } from '../../index';

describe('Level 17', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#FFFF00', id: 1 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.SMART_BOMB, id: 3 },
        },
        { staticEntity: { id: 5, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#FFFF00', id: 6 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 9, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.SMART_BOMB, id: 8 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_DOWN]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
