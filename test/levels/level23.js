import {
  MOVE_DOWN,
  MOVE_RIGHT,
  MOVE_LEFT,
  ENTITIES,
  levelIsComplete,
  makeMoves,
} from '../../src/index';

describe('Level 23', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 4 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 3 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 5 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 7 },
          movableEntity: { entityId: ENTITIES.CRATE.id, id: 6 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 9 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FFFF00', id: 8 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 10 }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 11 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 13 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#0000FF', id: 12 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 15 },
          movableEntity: { entityId: ENTITIES.CRATE.id, id: 14 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 16 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 17 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 19 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FFFF00', id: 18 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 20 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 21 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 22 }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 24 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#0000FF', id: 23 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
