import { ENTITIES, entitiesAreFading } from '../../src/';

describe('entitiesAreFading()', () => {
  const gameState = [
    [{ staticEntity: { id: 1, entityId: ENTITIES.FLOOR }, movableEntity: null }],
    [{ staticEntity: { id: 2, entityId: ENTITIES.FLOOR }, movableEntity: null }],
    [
      {
        staticEntity: { id: 4, entityId: ENTITIES.FLOOR },
        movableEntity: { id: 3, entityId: ENTITIES.BLOCK },
      },
    ],
  ];

  it('Should return false if no entities are fading', () => {
    const fading = entitiesAreFading(gameState);

    expect(fading).toBe(false);
  });

  it('Should return true if entities are fading', () => {
    const fading = entitiesAreFading([
      ...gameState,
      [
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 6, entityId: ENTITIES.BLOCK, fading: true },
        },
      ],
    ]);

    expect(fading).toBe(true);
  });
});
