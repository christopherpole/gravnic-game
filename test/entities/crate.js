import {
  MOVE_DOWN,
  MOVE_UP,
  MOVE_LEFT,
  ENTITIES,
  changeGravityDirection,
  levelIsComplete,
  makeMoves,
} from '../../src/';

describe('Crate entity', () => {
  it('Should move to unoccupied tiles', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.CRATE.id, id: 1 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 4 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 3 },
        },
      ],
      [
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 5 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 6 }, movableEntity: null },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });

  it('Should only move once during a move', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 4 },
          movableEntity: { entityId: ENTITIES.CRATE.id, id: 3 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 5 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 7 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 6 },
        },
      ],
      [
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 8 }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });

  it('Should be able to be moved again after each move', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 5 },
          movableEntity: { entityId: ENTITIES.CRATE.id, id: 4 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 7 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 6 },
        },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 9 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#0000FF', id: 8 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 10 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 11 }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 12 }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 14 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#0000FF', id: 13 },
        },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_DOWN, MOVE_UP, MOVE_LEFT]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
