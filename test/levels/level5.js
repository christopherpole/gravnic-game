import {
  MOVE_RIGHT,
  MOVE_DOWN,
  MOVE_NONE,
  ENTITIES,
  levelIsComplete,
  makeMoves,
} from '../../src/index';

describe('Level 5', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#00ff00', id: 3 },
        },
        {
          staticEntity: { id: 6, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 5 },
        },
        {
          staticEntity: { id: 8, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#00ff00', id: 7 },
        },
        {
          staticEntity: { id: 10, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 9 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 12, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#0000ff', id: 11 },
        },
        { staticEntity: { id: 13, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 14, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 15, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 16, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 17, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        {
          staticEntity: { id: 19, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#0000ff', id: 18 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 21, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#00ff00', id: 20 },
        },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 23, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#00ff00', id: 22 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_NONE, MOVE_DOWN, MOVE_RIGHT]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
