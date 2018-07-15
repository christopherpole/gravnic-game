import { ENTITIES, isMatchableEntity } from '../../src/';

describe('isMatchableEntity()', () => {
  it('Should return "true" if the given entity ID is matchable', () => {
    const matchable = isMatchableEntity(ENTITIES.BLOCK);

    expect(matchable).toBe(true);
  });

  it('Should return "false" if the given entity ID is not matchable', () => {
    const matchable = isMatchableEntity(ENTITIES.GLASS);

    expect(matchable).toBe(false);
  });
});
