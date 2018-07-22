import { ENTITIES, movableEntityCanMove } from '../../src/';

describe('movableEntityCanMove()', () => {
  it('Should return "false" if the current tile\'s has a movable entity but next tile has no static entity', () => {
    const currentTile = {
      staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
      movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
    };
    const nextTile = { staticEntity: null, movableEntity: null };

    expect(movableEntityCanMove(currentTile, nextTile)).toBe(false);
  });

  it('Should return "false" if the current has no movable entity', () => {
    const currentTile = {
      staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
      movableEntity: null,
    };
    const nextTile = { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 }, movableEntity: null };

    expect(movableEntityCanMove(currentTile, nextTile)).toBe(false);
  });

  it('Should return "false" if the next tile has a movable entity', () => {
    const currentTile = {
      staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
      movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
    };
    const nextTile = {
      staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 },
      movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#0000ff', id: 4 },
    };

    expect(movableEntityCanMove(currentTile, nextTile)).toBe(false);
  });

  it('Should return "false" if the current tile has a stuck movable entity', () => {
    const currentTile = {
      staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
      movableEntity: {
        entityId: ENTITIES.BLOCK.id,
        color: '#ff0000',
        stuck: true,
        id: 1,
      },
    };
    const nextTile = {
      staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 },
      movableEntity: null,
    };

    expect(movableEntityCanMove(currentTile, nextTile)).toBe(false);
  });

  it('Should return "false" if the next tile has a colorless powered barrier', () => {
    const currentTile = {
      staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
      movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
    };
    const nextTile = {
      staticEntity: { entityId: ENTITIES.BARRIER.id, powered: true, id: 3 },
      movableEntity: null,
    };

    expect(movableEntityCanMove(currentTile, nextTile)).toBe(false);
  });

  it('Should return "false" if the next tile has a powered barrier whose color does not match the current movable entity\'s', () => {
    const currentTile = {
      staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
      movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
    };
    const nextTile = {
      staticEntity: {
        entityId: ENTITIES.BARRIER.id,
        powered: true,
        color: '#00ff00',
        id: 3,
      },
      movableEntity: null,
    };

    expect(movableEntityCanMove(currentTile, nextTile)).toBe(false);
  });

  it('Should return "true" if the current tile\'s has a movable entity and the next tile has a blank space', () => {
    const currentTile = {
      staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
      movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
    };
    const nextTile = { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 }, movableEntity: null };

    expect(movableEntityCanMove(currentTile, nextTile)).toBe(true);
  });

  it('Should return "true" if the next tile has an unpowered barrier', () => {
    const currentTile = {
      staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
      movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
    };
    const nextTile = {
      staticEntity: {
        entityId: ENTITIES.BARRIER.id,
        powered: false,
        color: '#00ff00',
        id: 3,
      },
      movableEntity: null,
    };

    expect(movableEntityCanMove(currentTile, nextTile)).toBe(true);
  });
});
