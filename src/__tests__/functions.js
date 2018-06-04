import {
  MOVE_UP,
  ENTITIES,
  calulateNextGameState,
  changeGravityDirection,
  entitiesAreFading,
  levelIsComplete,
} from '../index';

describe('calulateNextGameState()', () => {
  let gameState = [
    [{ staticEntity: { id: 1, entityId: ENTITIES.FLOOR }, movableEntity: null }],
    [{ staticEntity: { id: 2, entityId: ENTITIES.FLOOR }, movableEntity: null }],
    [
      {
        staticEntity: { id: 4, entityId: ENTITIES.FLOOR },
        movableEntity: { id: 3, entityId: ENTITIES.BLOCK },
      },
    ],
  ];

  it('Should return the next game state', () => {
    //  Move 1
    gameState = calulateNextGameState(gameState, MOVE_UP);
    expect(gameState).toMatchSnapshot();

    //  Move 2
    gameState = calulateNextGameState(gameState, MOVE_UP);
    expect(gameState).toMatchSnapshot();
  });

  it('Should return false if the entities cannot move any further', () => {
    gameState = calulateNextGameState(gameState, MOVE_UP);
    expect(gameState).toBe(false);
  });
});

describe('changeGravityDirection()', () => {
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

  it('Should return an array of all game states from the move', () => {
    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
  });
});

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

describe('levelIsComplete()', () => {
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

  it('Should return false if there are matchable entities', () => {
    const complete = levelIsComplete(gameState);

    expect(complete).toBe(false);
  });

  it('Should return true if there are no matchable entities', () => {
    const complete = levelIsComplete(gameState.slice(0, 2));

    expect(complete).toBe(true);
  });
});
