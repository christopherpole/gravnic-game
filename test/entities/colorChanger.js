import {
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_DOWN,
  ENTITIES,
  changeGravityDirection,
  levelIsComplete,
} from '../../src/';

describe('Color changer entity', () => {
  it('Should change the entity of a passing matchable entity', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        {
          staticEntity: {
            entityId: ENTITIES.COLOR_CHANGER.id,
            targetEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000' },
            id: 3,
          },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 5 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#800080', id: 4 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_LEFT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });

  it('Should change the entity of a passing matchable entity multiple times', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        {
          staticEntity: {
            entityId: ENTITIES.COLOR_CHANGER.id,
            targetEntity: { entityId: ENTITIES.BLOCK.id, color: '#FFFF00' },
            id: 3,
          },
          movableEntity: null,
        },
        {
          staticEntity: {
            entityId: ENTITIES.COLOR_CHANGER.id,
            targetEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000' },
            id: 4,
          },
          movableEntity: null,
        },
        {
          staticEntity: {
            entityId: ENTITIES.COLOR_CHANGER.id,
            targetEntity: { entityId: ENTITIES.BLOCK.id, color: '#FF8C00' },
            id: 5,
          },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 7 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 6 },
        },
      ],
    ];

    let gameStates = changeGravityDirection(gameState, MOVE_LEFT);
    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);

    gameStates = changeGravityDirection(gameStates[gameStates.length - 1], MOVE_RIGHT);
    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });

  it('Should not change the entity of non-matchable passing movable entities', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 4 },
          movableEntity: { entityId: ENTITIES.GLASS.id, id: 3 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: {
            entityId: ENTITIES.COLOR_CHANGER.id,
            targetEntity: { entityId: ENTITIES.RAINBOW_BLOCK.id },
            id: 5,
          },
          movableEntity: null,
        },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 7 },
          movableEntity: { entityId: ENTITIES.SMART_BOMB.id, id: 6 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 8 }, movableEntity: null },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);
    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });
});
