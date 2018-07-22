import {
  MOVE_UP,
  MOVE_LEFT,
  MOVE_RIGHT,
  ENTITIES,
  levelIsComplete,
  makeMoves,
} from '../../src/index';

describe('Level 10', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: { id: 1, entityId: ENTITIES.BLACK_HOLE.id }, movableEntity: null },
        {
          staticEntity: { id: 3, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 2 },
        },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 4 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 6 },
        },
        { staticEntity: { id: 8, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 9, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 10, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 11, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 12, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: { id: 13, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 14, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 15, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 16, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 17, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 18, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        {
          staticEntity: { id: 20, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 19 },
        },
      ],
      [
        { staticEntity: { id: 21, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 22, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 23, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 24, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 25, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 26, entityId: ENTITIES.BLACK_HOLE.id }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 28, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 27 },
        },
        { staticEntity: { id: 29, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 30, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        {
          staticEntity: { id: 32, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 31 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: { id: 33, entityId: ENTITIES.BLACK_HOLE.id }, movableEntity: null },
        { staticEntity: { id: 34, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 36, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 35 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_UP, MOVE_LEFT, MOVE_UP, MOVE_RIGHT]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
