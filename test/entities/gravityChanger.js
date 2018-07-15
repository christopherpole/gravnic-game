import {
  MAX_GAME_STATES,
  MOVE_NONE,
  MOVE_LEFT,
  MOVE_DOWN,
  MOVE_UP,
  ENTITIES,
  changeGravityDirection,
  levelIsComplete,
} from '../../src/';

describe('Gravity changer entity', () => {
  it('Should let movable entities traveling in the same direction move across it', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
        },
      ],
      [{ staticEntity: { entityId: ENTITIES.FLOOR, id: 3 }, movableEntity: null }],
      [
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_UP, id: 4 },
          movableEntity: null,
        },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 6 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 5 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });

  it('Changes the direction of gravity when coming into contact with a movable entity in another direction', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
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
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 7 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 6 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_LEFT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });

  it('Stops gravity correctly', () => {
    const gameState = [
      [
        { staticEntity: { entityId: ENTITIES.BLACK_HOLE, id: 1 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_NONE, id: 2 },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 4 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#800080', id: 3 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_LEFT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });

  it("Doesn't crash the level in the case of an infinate loop", () => {
    const gameState = [
      [
        { staticEntity: { entityId: ENTITIES.BLACK_HOLE, id: 1 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: 'MOVE_RIGHT', id: 2 },
          movableEntity: null,
        },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 3 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 5 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#0000FF', id: 4 },
        },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: 'MOVE_LEFT', id: 6 },
          movableEntity: null,
        },
        { staticEntity: { entityId: ENTITIES.BLACK_HOLE, id: 7 }, movableEntity: null },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_LEFT);

    expect(gameStates).toMatchSnapshot();
    expect(gameStates.length).toBe(MAX_GAME_STATES);
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });

  it('Processes the first changer a movable entity hits in case of a conflict', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 3 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 4 }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 6 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 5 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 8 },
          movableEntity: { entityId: ENTITIES.GLASS, id: 7 },
        },
      ],
      [
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 9 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 10 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 11 }, movableEntity: null },
      ],
      [
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 12 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_LEFT, id: 13 },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_UP, id: 14 },
          movableEntity: null,
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });

  it('Processes gravity changers before other static entities', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 4 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#FF8C00', id: 3 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 6 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#FFFF00', id: 5 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR, id: 8 },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#008000', id: 7 },
        },
      ],
      [
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 9 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_UP, id: 10 },
          movableEntity: null,
        },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 11 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR, id: 12 }, movableEntity: null },
      ],
      [
        { staticEntity: { entityId: ENTITIES.LAVA, id: 13 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.BLACK_HOLE, id: 14 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.STICKY_SPOT, id: 15 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER, direction: MOVE_NONE, id: 16 },
          movableEntity: null,
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });
});
