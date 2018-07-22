import { MOVE_DOWN, ENTITIES, changeGravityDirection, levelIsComplete } from '../../src/';

describe('Smart bomb entity', () => {
  it('Should fade all blocks the same colour with a coloured block it comes into contact with', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#008000', id: 1 },
        },
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: { id: 4, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        {
          staticEntity: { id: 6, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.SMART_BOMB.id, id: 5 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 8, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FFFF00', id: 7 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 10, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#008000', id: 9 },
        },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });

  it('Does not match with non-matchable blocks', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.SMART_BOMB.id, id: 1 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.GLASS.id, id: 4 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FFFF00', id: 6 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });

  it('Fades all movable entities on the board when connecting with a rainbow block', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.RAINBOW_BLOCK.id, id: 1 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 4 },
        },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.SMART_BOMB.id, id: 6 },
        },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 9, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.GLASS.id, id: 8 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 11, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FF8C00', id: 10 },
        },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 13, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#8B4513', id: 12 },
        },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 15, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.RAINBOW_BLOCK.id, id: 14 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });

  it('Does not match with other smart bombs', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.SMART_BOMB.id, id: 1 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.SMART_BOMB.id, id: 4 },
        },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 6 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });

  it('Matches with other smart bombs via matchable entities', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FFFF00', id: 1 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.SMART_BOMB.id, id: 3 },
        },
        { staticEntity: { id: 5, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FFFF00', id: 6 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 9, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.SMART_BOMB.id, id: 8 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });
});
