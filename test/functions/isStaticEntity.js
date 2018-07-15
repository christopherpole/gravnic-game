import { ENTITIES, isStaticEntity } from '../../src/';

describe('isStaticEntity()', () => {
  it('Should return "true" if the given entity ID is matchable', () => {
    const isStatic = isStaticEntity(ENTITIES.STICKY_SPOT);

    expect(isStatic).toBe(true);
  });

  it('Should return "false" if the given entity ID is not matchable', () => {
    const isStatic = isStaticEntity(ENTITIES.BLOCK);

    expect(isStatic).toBe(false);
  });
});
