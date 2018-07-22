import { ENTITIES, getTilesToProcess, MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT } from '../../src/';

describe('getTilesToProcess()', () => {
  let gameState;

  beforeEach(() => {
    gameState = [
      [
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 1 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 }, movableEntity: null },
      ],
      [
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 4 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 5 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 6 }, movableEntity: null },
      ],
      [
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 7 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 8 }, movableEntity: null },
        { staticEntity: { entityId: ENTITIES.FLOOR.id, id: 9 }, movableEntity: null },
      ],
    ];
  });

  it('Returns the correct array with gravity moving up', () => {
    const tilesToProcess = getTilesToProcess(gameState, MOVE_UP);

    expect(tilesToProcess).toMatchSnapshot();
  });

  it('Returns the correct array with gravity moving right', () => {
    const tilesToProcess = getTilesToProcess(gameState, MOVE_RIGHT);

    expect(tilesToProcess).toMatchSnapshot();
  });

  it('Returns the correct array with gravity moving down', () => {
    const tilesToProcess = getTilesToProcess(gameState, MOVE_DOWN);

    expect(tilesToProcess).toMatchSnapshot();
  });

  it('Returns the correct array with gravity moving left', () => {
    const tilesToProcess = getTilesToProcess(gameState, MOVE_LEFT);

    expect(tilesToProcess).toMatchSnapshot();
  });
});
