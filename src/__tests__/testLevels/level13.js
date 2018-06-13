import {
  MOVE_LEFT,
  MOVE_DOWN,
  MOVE_RIGHT,
  MOVE_UP,
  ENTITIES,
  levelIsComplete,
  makeMoves,
} from '../../index';

describe('Level 13', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#800080', id: 1 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#008000', id: 3 },
        },
        { staticEntity: { id: 5, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 6, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 7, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 9, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.GLASS, id: 8 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 11, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.GLASS, id: 10 },
        },
        { staticEntity: { id: 12, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 13, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 14, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 15, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 16, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 18, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.GLASS, id: 17 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: { id: 19, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 20, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 21, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 22, entityId: ENTITIES.STICKY_SPOT }, movableEntity: null },
        { staticEntity: { id: 23, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 24, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 25, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 27, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 26 },
        },
        { staticEntity: { id: 28, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 29, entityId: ENTITIES.BLACK_HOLE }, movableEntity: null },
        { staticEntity: { id: 30, entityId: ENTITIES.STICKY_SPOT }, movableEntity: null },
        {
          staticEntity: { id: 32, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.RAINBOW_BLOCK, id: 31 },
        },
        { staticEntity: { id: 33, entityId: ENTITIES.STICKY_SPOT }, movableEntity: null },
        { staticEntity: { id: 34, entityId: ENTITIES.BLACK_HOLE }, movableEntity: null },
        { staticEntity: { id: 35, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 37, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#FFFF00', id: 36 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: { id: 38, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 39, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 40, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 41, entityId: ENTITIES.STICKY_SPOT }, movableEntity: null },
        { staticEntity: { id: 42, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 43, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 44, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 46, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.GLASS, id: 45 },
        },
        { staticEntity: { id: 47, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 48, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 49, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 50, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 51, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 53, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#800080', id: 52 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 55, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.GLASS, id: 54 },
        },
        { staticEntity: { id: 56, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 57, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 58, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 60, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.GLASS, id: 59 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 62, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#008000', id: 61 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [
      MOVE_LEFT,
      MOVE_DOWN,
      MOVE_RIGHT,
      MOVE_LEFT,
      MOVE_UP,
      MOVE_RIGHT,
      MOVE_DOWN,
      MOVE_LEFT,
      MOVE_UP,
      MOVE_RIGHT,
    ]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
