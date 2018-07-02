import {
  MOVE_NONE,
  MOVE_UP,
  MOVE_RIGHT,
  ENTITIES,
  levelIsComplete,
  makeMoves,
} from '../../src/index';

describe('Level 21', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.LAVA, id: 1 }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 2 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 3 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 4 }, movableEntity: null },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 6 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 5 },
        },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_NONE, id: 7 },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_NONE, id: 8 },
          movableEntity: null,
        },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 9 }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 11 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 10 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 12 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.LAVA, id: 13 }, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_RIGHT, MOVE_UP, MOVE_RIGHT]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
