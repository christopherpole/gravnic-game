import { ENTITIES, levelIsComplete } from '../../src/';

describe('levelIsComplete()', () => {
  const gameState = [
    [{ staticEntity: { id: 1, entityId: ENTITIES.FLOOR.id }, movableEntity: null }],
    [{ staticEntity: { id: 2, entityId: ENTITIES.FLOOR.id }, movableEntity: null }],
    [
      {
        staticEntity: { id: 4, entityId: ENTITIES.FLOOR.id },
        movableEntity: { id: 3, entityId: ENTITIES.BLOCK.id },
      },
    ],
  ];

  it('Should return false if there are matchable entities', () => {
    const complete = levelIsComplete(gameState);

    expect(complete).toBe(false);
  });

  it('Should return true if there are no matchable entities', () => {
    const complete = levelIsComplete(gameState.slice(0, 2));

    expect(complete).toBe(true);
  });
});
