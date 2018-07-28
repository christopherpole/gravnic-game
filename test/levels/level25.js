import { MOVE_RIGHT, MOVE_DOWN, ENTITIES, levelIsComplete, makeMoves } from '../../src/index';

describe('Level 25', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#800080', id: 1 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 5 },
          movableEntity: { entityId: ENTITIES.CRATE.id, id: 4 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 6 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 8 },
          movableEntity: { entityId: ENTITIES.CRUSHER.id, id: 7 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 10 },
          movableEntity: { entityId: ENTITIES.CRUSHER.id, id: 9 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 11 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 12 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.BLACK_HOLE.id, id: 13 }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 14 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 15 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 16 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 18 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#0000FF', id: 17 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 20 },
          movableEntity: { entityId: ENTITIES.CRUSHER.id, id: 19 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_RIGHT, MOVE_DOWN]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
