import { ENTITIES, entitiesMatch } from '../../src/';

describe('entitiesMatch()', () => {
  it('Matches two matching colored blocks together', () => {
    const matching = entitiesMatch(
      {
        entityId: ENTITIES.BLOCK.id,
        color: '#ff0000',
      },
      {
        entityId: ENTITIES.BLOCK.id,
        color: '#ff0000',
      },
    );

    expect(matching).toBe(true);
  });

  it("Doesn't match two non-matching colored blocks together", () => {
    const matching = entitiesMatch(
      {
        entityId: ENTITIES.BLOCK.id,
        color: '#00ff00',
      },
      {
        entityId: ENTITIES.BLOCK.id,
        color: '#ff0000',
      },
    );

    expect(matching).toBe(false);
  });
});
