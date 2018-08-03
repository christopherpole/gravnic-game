import { MOVE_RIGHT, ENTITIES, levelIsComplete, makeMoves } from '../../src/index';

describe('Level 27', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 4 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FF8C00', id: 3 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 6 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FFFF00', id: 5 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 7 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.TELEPORTER.id, id: 8, linkedEntityId: 14 },
          movableEntity: null,
        },
      ],
      [
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 9 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 10 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 11 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 12 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.TELEPORTER.id, id: 13, linkedEntityId: 18 },
          movableEntity: null,
        },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.TELEPORTER.id, id: 14, linkedEntityId: 8 },
          movableEntity: null,
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 15 }, movableEntity: null },
        {
          staticEntity: {
            entityId: ENTITIES.COLOR_CHANGER.id,
            targetEntity: { entityId: ENTITIES.BLOCK.id, color: '#FF8C00' },
            id: 16,
          },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER.id, direction: 'MOVE_LEFT', id: 17 },
          movableEntity: null,
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.TELEPORTER.id, id: 18, linkedEntityId: 13 },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 20 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 19 },
        },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_RIGHT]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
