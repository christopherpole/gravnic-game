import {
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
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#FFFF00', id: 1 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#FFFF00', id: 3 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 6, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 5 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 8, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#0000FF', id: 7 },
        },
        { staticEntity: { id: 9, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 11, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#800080', id: 10 },
        },
        { staticEntity: { id: 12, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 13, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 15, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 14 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 17, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 16 },
        },
        { staticEntity: { id: 18, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 19, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 20, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 21, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 22, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 24, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.RAINBOW_BLOCK, id: 23 },
        },
        { staticEntity: { id: 25, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 26, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 27, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 28, entityId: ENTITIES.STICKY_SPOT }, movableEntity: null },
        { staticEntity: { id: 29, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 30, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: { id: 31, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 32, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 33, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 34, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 35, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 36, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 38, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#0000FF', id: 37 },
        },
        { staticEntity: { id: 39, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 40, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 41, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 42, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 44, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.GLASS, id: 43 },
        },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_DOWN, MOVE_LEFT, MOVE_DOWN, MOVE_RIGHT]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
