import {
  MOVE_UP,
  MOVE_LEFT,
  MOVE_DOWN,
  MOVE_RIGHT,
  ENTITIES,
  levelIsComplete,
  makeMoves,
} from '../../index';

describe('Level 12', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#008000', id: 1 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 3 },
        },
        { staticEntity: { id: 5, entityId: ENTITIES.LAVA }, movableEntity: null },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#8B4513', id: 6 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 9, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#008000', id: 8 },
        },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_UP, MOVE_LEFT, MOVE_DOWN, MOVE_RIGHT]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
