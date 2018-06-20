import { MOVE_UP, MOVE_DOWN, ENTITIES, levelIsComplete, makeMoves } from '../../index';

describe('Level 14', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#FFFF00', id: 1 },
        },
      ],
      [{ staticEntity: { id: 3, entityId: ENTITIES.BLACK_HOLE }, movableEntity: null }],
      [{ staticEntity: { id: 4, entityId: ENTITIES.LAVA }, movableEntity: null }],
      [{ staticEntity: { id: 5, entityId: ENTITIES.BLACK_HOLE }, movableEntity: null }],
      [
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 6 },
        },
      ],
      [
        {
          staticEntity: { id: 9, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#008000', id: 8 },
        },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_UP, MOVE_DOWN]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
