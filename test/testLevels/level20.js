import {
  MOVE_UP,
  MOVE_DOWN,
  MOVE_RIGHT,
  MOVE_LEFT,
  ENTITIES,
  levelIsComplete,
  makeMoves,
} from '../../src/index';

describe('Level 20', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_RIGHT, id: 1 },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_DOWN, id: 2 },
          movableEntity: null,
        },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 3 }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_UP, id: 4 },
          movableEntity: null,
        },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 5 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 6 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 7 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_LEFT, id: 8 },
          movableEntity: null,
        },
      ],
      [
        { staticEntity: { entityId: ENTITIES.STICKY_SPOT, id: 9 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 10 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_DOWN, id: 11 },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_LEFT, id: 12 },
          movableEntity: null,
        },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 13 }, movableEntity: null },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 15 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 14 },
        },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_LEFT, id: 16 },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_RIGHT, id: 17 },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 19 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 18 },
        },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_UP, id: 20 },
          movableEntity: null,
        },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_UP]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
