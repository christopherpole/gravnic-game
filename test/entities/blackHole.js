import {
  MOVE_RIGHT,
  MOVE_LEFT,
  ENTITIES,
  changeGravityDirection,
  levelIsComplete,
} from '../../src/';

describe('Black hole entity', () => {
  it('Should suck in any movable entities', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        { staticEntity: { id: 3, entityId: ENTITIES.BLACK_HOLE.id }, movableEntity: null },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_RIGHT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });

  it('Should disappear after fading an entity', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        { staticEntity: { id: 3, entityId: ENTITIES.BLACK_HOLE.id }, movableEntity: null },
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.GLASS.id, id: 4 },
        },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 6 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_LEFT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });
});
