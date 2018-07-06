import {
  MOVE_UP,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  ENTITIES,
  calulateNextGameState,
  changeGravityDirection,
  entitiesMatch,
  entitiesAreFading,
  levelIsComplete,
  isMatchableEntity,
  isStaticEntity,
  makeMoves,
  getInitialGameState,
  movableEntityCanMove,
} from '../src/index';

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
    expect(gameState.gameState).toMatchSnapshot();

    //  Move 2
    gameState = calulateNextGameState(gameState.gameState, MOVE_UP);
    expect(gameState.gameState).toMatchSnapshot();
  });

  it('Should return false if the entities cannot move any further', () => {
    gameState = calulateNextGameState(gameState.gameState, MOVE_UP);
    expect(gameState.gameState).toBe(false);
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

  it('Should return the given game state if the move does not result in changes', () => {
    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);

    expect(gameStates).toEqual([gameState]);
  });

  it('Should return an array of all game states from the move', () => {
    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
  });
});

describe('entitiesMatch()', () => {
  it('Matches two matching colored blocks together', () => {
    const matching = entitiesMatch(
      {
        entityId: ENTITIES.BLOCK,
        color: '#ff0000',
      },
      {
        entityId: ENTITIES.BLOCK,
        color: '#ff0000',
      },
    );

    expect(matching).toBe(true);
  });

  it("Doesn't match two non-matching colored blocks together", () => {
    const matching = entitiesMatch(
      {
        entityId: ENTITIES.BLOCK,
        color: '#00ff00',
      },
      {
        entityId: ENTITIES.BLOCK,
        color: '#ff0000',
      },
    );

    expect(matching).toBe(false);
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

describe('makeMoves()', () => {
  it('Should return an array of game states for the given moves', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
        },
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: { id: 4, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 5, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
    ];

    const gameStates = makeMoves(gameState, [MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT, MOVE_UP]);
    expect(gameStates).toMatchSnapshot();
  });
});

describe('getInitialGameState()', () => {
  it('Should return the initial game states for the given state', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
        },
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 3 },
        },
      ],
    ];

    const gameStates = getInitialGameState(gameState);
    expect(gameStates).toMatchSnapshot();
  });
});

describe('movableEntityCanMove()', () => {
  it('Should return "false" if the current tile\'s has a movable entity but next tile has no static entity', () => {
    const currentTile = {
      staticEntity: { entityId: 'FLOOR', id: 2 },
      movableEntity: { entityId: 'BLOCK', color: '#ff0000', id: 1 },
    };
    const nextTile = { staticEntity: null, movableEntity: null };

    expect(movableEntityCanMove(currentTile, nextTile)).toBe(false);
  });

  it('Should return "false" if the current has no movable entity', () => {
    const currentTile = {
      staticEntity: { entityId: 'FLOOR', id: 2 },
      movableEntity: null,
    };
    const nextTile = { staticEntity: { entityId: 'FLOOR', id: 3 }, movableEntity: null };

    expect(movableEntityCanMove(currentTile, nextTile)).toBe(false);
  });

  it('Should return "false" if the next tile has a movable entity', () => {
    const currentTile = {
      staticEntity: { entityId: 'FLOOR', id: 2 },
      movableEntity: { entityId: 'BLOCK', color: '#ff0000', id: 1 },
    };
    const nextTile = {
      staticEntity: { entityId: 'FLOOR', id: 3 },
      movableEntity: { entityId: 'BLOCK', color: '#0000ff', id: 4 },
    };

    expect(movableEntityCanMove(currentTile, nextTile)).toBe(false);
  });

  it('Should return "false" if the current tile has a stuck movable entity', () => {
    const currentTile = {
      staticEntity: { entityId: 'FLOOR', id: 2 },
      movableEntity: {
        entityId: 'BLOCK',
        color: '#ff0000',
        stuck: true,
        id: 1,
      },
    };
    const nextTile = {
      staticEntity: { entityId: 'FLOOR', id: 3 },
      movableEntity: null,
    };

    expect(movableEntityCanMove(currentTile, nextTile)).toBe(false);
  });

  it('Should return "false" if the next tile has a colorless powered barrier', () => {
    const currentTile = {
      staticEntity: { entityId: 'FLOOR', id: 2 },
      movableEntity: { entityId: 'BLOCK', color: '#ff0000', id: 1 },
    };
    const nextTile = {
      staticEntity: { entityId: 'BARRIER', powered: true, id: 3 },
      movableEntity: null,
    };

    expect(movableEntityCanMove(currentTile, nextTile)).toBe(false);
  });

  it('Should return "false" if the next tile has a powered barrier whose color does not match the current movable entity\'s', () => {
    const currentTile = {
      staticEntity: { entityId: 'FLOOR', id: 2 },
      movableEntity: { entityId: 'BLOCK', color: '#ff0000', id: 1 },
    };
    const nextTile = {
      staticEntity: {
        entityId: 'BARRIER',
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
      staticEntity: { entityId: 'FLOOR', id: 2 },
      movableEntity: { entityId: 'BLOCK', color: '#ff0000', id: 1 },
    };
    const nextTile = { staticEntity: { entityId: 'FLOOR', id: 3 }, movableEntity: null };

    expect(movableEntityCanMove(currentTile, nextTile)).toBe(true);
  });

  it('Should return "true" if the next tile has an unpowered barrier', () => {
    const currentTile = {
      staticEntity: { entityId: 'FLOOR', id: 2 },
      movableEntity: { entityId: 'BLOCK', color: '#ff0000', id: 1 },
    };
    const nextTile = {
      staticEntity: {
        entityId: 'BARRIER',
        powered: false,
        color: '#00ff00',
        id: 3,
      },
      movableEntity: null,
    };

    expect(movableEntityCanMove(currentTile, nextTile)).toBe(true);
  });
});
