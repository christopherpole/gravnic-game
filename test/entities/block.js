import { MOVE_UP, ENTITIES, changeGravityDirection, levelIsComplete } from '../../src/';

describe('Block entity', () => {
  it('Should match with other blocks of the same color', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { id: 1, entityId: ENTITIES.BLOCK.id, color: '#ff0000' },
        },
      ],
      [{ staticEntity: { id: 3, entityId: ENTITIES.FLOOR.id }, movableEntity: null }],
      [
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR.id },
          movableEntity: { id: 4, entityId: ENTITIES.BLOCK.id, color: '#ff0000' },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });

  it('Should not match with other blocks that are not the same color', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { id: 1, entityId: ENTITIES.BLOCK.id, color: '#00ff00' },
        },
      ],
      [{ staticEntity: { id: 3, entityId: ENTITIES.FLOOR.id }, movableEntity: null }],
      [
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR.id },
          movableEntity: { id: 4, entityId: ENTITIES.BLOCK.id, color: '#ff0000' },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });

  it('Should wait until all blocks have stopped moving before matching', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { id: 1, entityId: ENTITIES.BLOCK.id },
        },
      ],
      [{ staticEntity: { id: 3, entityId: ENTITIES.FLOOR.id }, movableEntity: null }],
      [
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR.id },
          movableEntity: { id: 4, entityId: ENTITIES.BLOCK.id },
        },
      ],
      [{ staticEntity: { id: 6, entityId: ENTITIES.FLOOR.id }, movableEntity: null }],
      [{ staticEntity: { id: 7, entityId: ENTITIES.FLOOR.id }, movableEntity: null }],
      [{ staticEntity: { id: 8, entityId: ENTITIES.FLOOR.id }, movableEntity: null }],
      [{ staticEntity: { id: 9, entityId: ENTITIES.FLOOR.id }, movableEntity: null }],
      [
        {
          staticEntity: { id: 11, entityId: ENTITIES.FLOOR.id },
          movableEntity: { id: 10, entityId: ENTITIES.BLOCK.id },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
  });

  it('Should match more than two blocks', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { id: 1, entityId: ENTITIES.BLOCK.id },
        },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR.id },
          movableEntity: { id: 3, entityId: ENTITIES.BLOCK.id },
        },
      ],
      [
        { staticEntity: { id: 5, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR.id },
          movableEntity: { id: 6, entityId: ENTITIES.BLOCK.id },
        },
        { staticEntity: { id: 8, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
      ],
      [
        { staticEntity: { id: 9, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 10, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 11, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 13, entityId: ENTITIES.FLOOR.id },
          movableEntity: { id: 12, entityId: ENTITIES.BLOCK.id },
        },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
  });
});
