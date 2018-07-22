import { MOVE_DOWN, MOVE_RIGHT, ENTITIES, levelIsComplete, makeMoves } from '../../src/index';

describe('Level 22', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#0000FF', id: 1 },
        },
        {
          staticEntity: {
            entityId: ENTITIES.BARRIER.id,
            color: '#008000',
            powered: false,
            id: 3,
          },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 5 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#0000FF', id: 4 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 7 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 6 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 9 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#800080', id: 8 },
        },
        {
          staticEntity: { entityId: ENTITIES.BARRIER.id, powered: false, id: 10 },
          movableEntity: null,
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 12 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#800080', id: 11 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.BARRIER.id, powered: true, id: 13 },
          movableEntity: null,
        },
        {
          staticEntity: {
            entityId: ENTITIES.BARRIER.id,
            color: '#ff0000',
            powered: true,
            id: 14,
          },
          movableEntity: null,
        },
        {
          staticEntity: {
            entityId: ENTITIES.BARRIER.id,
            color: '#8B4513',
            powered: true,
            id: 15,
          },
          movableEntity: null,
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 16 }, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 18 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 17 },
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 19 }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_DOWN, MOVE_RIGHT]);
    expect(gameStates).toMatchSnapshot();
    expect(
      levelIsComplete(
        gameStates[gameStates.length - 1][gameStates[gameStates.length - 1].length - 1],
      ),
    ).toBe(true);
  });
});
