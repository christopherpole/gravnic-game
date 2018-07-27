import { MOVE_RIGHT, ENTITIES, levelIsComplete, makeMoves } from '../../src/index';

describe('Level 24', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 1 }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 4 },
          movableEntity: { entityId: ENTITIES.CRATE.id, id: 3 },
        },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 6 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 5 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 8 },
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 7 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 10 },
          movableEntity: { entityId: ENTITIES.CRATE.id, id: 9 },
        },
        {
          staticEntity: { entityId: ENTITIES.GRAVITY_CHANGER.id, direction: 'MOVE_UP', id: 11 },
          movableEntity: null,
        },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 12 }, movableEntity: null },
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
