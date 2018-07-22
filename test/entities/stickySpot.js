import {
  MOVE_RIGHT,
  MOVE_LEFT,
  ENTITIES,
  changeGravityDirection,
  levelIsComplete,
} from '../../src/';

describe('Sticky spot entity', () => {
  it('Should stick any movable entities passing over in place', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 4, entityId: ENTITIES.STICKY_SPOT.id }, movableEntity: null },
        { staticEntity: { id: 5, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 6 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_RIGHT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });

  it('Should be able to stuck multiple entities in its lifetime', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#8B4513', id: 1 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#800080', id: 3 },
        },
        {
          staticEntity: { id: 6, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#8B4513', id: 5 },
        },
        { staticEntity: { id: 7, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 8, entityId: ENTITIES.STICKY_SPOT.id }, movableEntity: null },
        { staticEntity: { id: 9, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 11, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#800080', id: 10 },
        },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_RIGHT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });

  it('Stops entities interacting with adjacent black holes', () => {
    const gameState = [
      [
        { staticEntity: { id: 1, entityId: ENTITIES.BLACK_HOLE.id }, movableEntity: null },
        { staticEntity: { id: 2, entityId: ENTITIES.STICKY_SPOT.id }, movableEntity: null },
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.RAINBOW_BLOCK.id, id: 3 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_LEFT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });
});
