import {
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  ENTITIES,
  changeGravityDirection,
  levelIsComplete,
  makeMoves,
} from '../../src/';

describe('Teleporter entity', () => {
  it("Shouldn't do anything if not linked", () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.TELEPORTER.id, id: 4 }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.TELEPORTER.id, id: 5 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 6 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 8 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 7 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_LEFT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });

  it('Should teleport movable entities just fine if linked', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.TELEPORTER.id, id: 4, linkedEntityId: 5 },
          movableEntity: null,
        },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.TELEPORTER.id, id: 5, linkedEntityId: 4 },
          movableEntity: null,
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 6 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 8 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 7 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_LEFT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });

  it('Should teleport entities and leave them on the other teleporter if there is nowhere for it to move', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 1 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 2 },
        },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 5 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 4 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 6 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.TELEPORTER.id, id: 7, linkedEntityId: 8 },
          movableEntity: null,
        },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.TELEPORTER.id, id: 8, linkedEntityId: 7 },
          movableEntity: null,
        },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_RIGHT, MOVE_UP]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });

  it('Should not teleport entities if the other teleporter is blocked', () => {
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
        {
          staticEntity: { entityId: ENTITIES.TELEPORTER.id, id: 5, linkedEntityId: 6 },
          movableEntity: null,
        },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.TELEPORTER.id, id: 6, linkedEntityId: 5 },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 8 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 7 },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_RIGHT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
  });

  it('Teleports entities in quick succession', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.TELEPORTER.id, id: 1, linkedEntityId: 16 },
          movableEntity: null,
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 5 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FFFF00', id: 4 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 7 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FF8C00', id: 6 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 9 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 8 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 11 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 10 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 13 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FF8C00', id: 12 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 15 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FFFF00', id: 14 },
        },
        {
          staticEntity: { entityId: ENTITIES.TELEPORTER.id, id: 16, linkedEntityId: 1 },
          movableEntity: null,
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_RIGHT);

    expect(gameStates).toMatchSnapshot();
    expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
  });
});
