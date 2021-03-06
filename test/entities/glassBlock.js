import { MOVE_DOWN, ENTITIES, changeGravityDirection, levelIsComplete } from '../../src/';

describe('Glass block entity', () => {
  it('Should move to unoccupied tiles', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.GLASS.id, id: 1 },
        },
      ],
      [{ staticEntity: { id: 3, entityId: ENTITIES.FLOOR.id }, movableEntity: null }],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });

  it('Should not match with other matchable entities', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.GLASS.id, id: 1 },
        },
      ],
      [{ staticEntity: { id: 3, entityId: ENTITIES.FLOOR.id }, movableEntity: null }],
      [
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.RAINBOW_BLOCK.id, id: 4 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });
});
