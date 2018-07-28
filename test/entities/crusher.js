import {
  MOVE_UP,
  MOVE_DOWN,
  MOVE_RIGHT,
  ENTITIES,
  changeGravityDirection,
  levelIsComplete,
} from '../../src/';

describe('Crusher entity', () => {
  it('Should crush a single movable entity', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
      ],
      [{ staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 }, movableEntity: null }],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 5 },
          movableEntity: { entityId: ENTITIES.CRUSHER.id, id: 4 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });

  it('Should crush multiple movable entities', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.GLASS.id, id: 1 },
        },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 4 },
          movableEntity: { entityId: ENTITIES.SMART_BOMB.id, id: 3 },
        },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 6 },
          movableEntity: { entityId: ENTITIES.CRATE.id, id: 5 },
        },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 8 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 7 },
        },
      ],
      [{ staticEntity: { entityId: ENTITIES.FLOOR.id, id: 9 }, movableEntity: null }],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 11 },
          movableEntity: { entityId: ENTITIES.CRUSHER.id, id: 10 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });

  it('Should not crush static entities', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#800080', id: 1 },
        },
      ],
      [{ staticEntity: { entityId: ENTITIES.STICKY_SPOT.id, id: 3 }, movableEntity: null }],
      [
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER.id, direction: MOVE_UP, id: 4 },
          movableEntity: null,
        },
      ],
      [
        {
          staticEntity: {
            entityId: ENTITIES.COLOR_CHANGER.id,
            targetEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000' },
            id: 5,
          },
          movableEntity: null,
        },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 7 },
          movableEntity: { entityId: ENTITIES.CRUSHER.id, id: 6 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });

  it('Should crush movable entities that move in to it', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#0000FF', id: 1 },
        },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 4 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FFE4E1', id: 3 },
        },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 6 },
          movableEntity: { entityId: ENTITIES.GLASS.id, id: 5 },
        },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 8 },
          movableEntity: { entityId: ENTITIES.CRUSHER.id, id: 7 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });

  it('Should not crush entities while stuck', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.CRUSHER.id, id: 1 },
        },
        { staticEntity: { entityId: ENTITIES.STICKY_SPOT.id, id: 3 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 5 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 4 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_RIGHT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });

  it('Should not let stuck entities fall into it', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.CRATE.id, id: 1 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 5 },
          movableEntity: { entityId: ENTITIES.CRUSHER.id, id: 4 },
        },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 7 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 6 },
        },
        { staticEntity: { entityId: ENTITIES.STICKY_SPOT.id, id: 8 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 10 },
          movableEntity: { entityId: ENTITIES.CRUSHER.id, id: 9 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_RIGHT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });
});
