import { MOVE_RIGHT, ENTITIES, changeGravityDirection, levelIsComplete } from '../index';

describe('Rainbow block entity', () => {
  it('Should match with any colored block', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#008000', id: 1 },
        },
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.RAINBOW_BLOCK, id: 4 },
        },
        { staticEntity: { id: 6, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 8, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 7 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_RIGHT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });

  it('Should match with other rainbow blocks', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.RAINBOW_BLOCK, id: 1 },
        },
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.RAINBOW_BLOCK, id: 4 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_RIGHT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });

  it('Should not match with non-matchable blocks', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.RAINBOW_BLOCK, id: 1 },
        },
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.GLASS, id: 4 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_RIGHT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });
});
