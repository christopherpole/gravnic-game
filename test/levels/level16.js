import { MOVE_LEFT, MOVE_RIGHT, ENTITIES, levelIsComplete, makeMoves } from '../../src/index';

describe('Level 16', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.RAINBOW_BLOCK.id, id: 1 },
        },
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.GLASS.id, id: 3 },
        },
        { staticEntity: { id: 5, entityId: ENTITIES.BLACK_HOLE.id }, movableEntity: null },
        { staticEntity: { id: 6, entityId: ENTITIES.FLOOR.id }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 8, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#FFFF00', id: 7 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 10, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 9 },
        },
        { staticEntity: { id: 11, entityId: ENTITIES.LAVA.id }, movableEntity: null },
        { staticEntity: { id: 12, entityId: ENTITIES.STICKY_SPOT.id }, movableEntity: null },
        {
          staticEntity: { id: 14, entityId: ENTITIES.FLOOR.id },
          movableEntity: { entityId: ENTITIES.SMART_BOMB.id, id: 13 },
        },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_LEFT, MOVE_RIGHT]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
