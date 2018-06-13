import {
  MOVE_UP,
  MOVE_LEFT,
  MOVE_DOWN,
  MOVE_RIGHT,
  ENTITIES,
  levelIsComplete,
  makeMoves,
} from '../../index';

describe('Level 11', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        { staticEntity: { id: 1, entityId: ENTITIES.BLACK_HOLE }, movableEntity: null },
        {
          staticEntity: { id: 3, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#008000', id: 2 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 4 },
        },
        { staticEntity: { id: 6, entityId: ENTITIES.BLACK_HOLE }, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 8, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#FFFF00', id: 7 },
        },
        { staticEntity: { id: 9, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 10, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 11, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 12, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 14, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#800080', id: 13 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: { id: 15, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 17, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.GLASS, id: 16 },
        },
        {
          staticEntity: { id: 19, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.GLASS, id: 18 },
        },
        { staticEntity: { id: 20, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: { id: 21, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 23, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.GLASS, id: 22 },
        },
        {
          staticEntity: { id: 25, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.GLASS, id: 24 },
        },
        { staticEntity: { id: 26, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 28, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#FF8C00', id: 27 },
        },
        { staticEntity: { id: 29, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 30, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 31, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 32, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 34, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#0000FF', id: 33 },
        },
      ],
      [
        { staticEntity: { id: 35, entityId: ENTITIES.BLACK_HOLE }, movableEntity: null },
        {
          staticEntity: { id: 37, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#0000FF', id: 36 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 39, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#008000', id: 38 },
        },
        { staticEntity: { id: 40, entityId: ENTITIES.BLACK_HOLE }, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [
      MOVE_UP,
      MOVE_LEFT,
      MOVE_DOWN,
      MOVE_RIGHT,
      MOVE_LEFT,
      MOVE_UP,
      MOVE_RIGHT,
      MOVE_UP,
      MOVE_LEFT,
    ]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
