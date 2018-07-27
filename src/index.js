const MOVE_NONE = 'MOVE_NONE';
const MOVE_UP = 'MOVE_UP';
const MOVE_RIGHT = 'MOVE_RIGHT';
const MOVE_DOWN = 'MOVE_DOWN';
const MOVE_LEFT = 'MOVE_LEFT';
const MAX_GAME_STATES = 100;

const ENTITIES = {
  NONE: {
    id: 'NONE',
  },
  FLOOR: {
    id: 'FLOOR',
    static: true,
  },
  GLASS: {
    id: 'GLASS',
  },
  BOMB: {
    id: 'BOMB',
  },
  CRATE: {
    id: 'CRATE',
  },
  BLOCK: {
    id: 'BLOCK',
    matchable: true,
  },
  RAINBOW_BLOCK: {
    id: 'RAINBOW_BLOCK',
    matchable: true,
  },
  BLACK_HOLE: {
    id: 'BLACK_HOLE',
    static: true,
  },
  STICKY_SPOT: {
    id: 'STICKY_SPOT',
    static: true,
  },
  LAVA: {
    id: 'LAVA',
    static: true,
  },
  SMART_BOMB: {
    id: 'SMART_BOMB',
  },
  COLOR_CHANGER: {
    id: 'COLOR_CHANGER',
    static: true,
  },
  GRAVITY_CHANGER: {
    id: 'GRAVITY_CHANGER',
    static: true,
  },
  BARRIER: {
    id: 'BARRIER',
    static: true,
  },
};

/**
 * Returns "true" if there is a movable entity on the first given tile that can move to the
 * second given tile
 * @param {Object} currentTile - The current tile
 * @param {Object} nextTile - The tile to move to
 * @returns {Boolean} "true" if current tile has a movable entity that can move onto the target tile
 */
const movableEntityCanMove = (currentTile, nextTile) => {
  //  If the next tile doesn't have a static entity of any sort then return "false"
  if (!nextTile.staticEntity) {
    return false;
  }

  //  If the current tile doesn't have a movable entity then return "false"
  if (!currentTile.movableEntity) {
    return false;
  }

  //  If the next tile has a movable entity then return "false"
  if (nextTile.movableEntity) {
    return false;
  }

  //  If the current tile's movable entity is a create that has moved then return "false"
  if (currentTile.movableEntity.entityId === ENTITIES.CRATE.id && currentTile.movableEntity.moved) {
    return false;
  }

  //  If the current tile's movable entity if stuck then return "false"
  if (currentTile.movableEntity.stuck) {
    return false;
  }

  //  Return "false" if the next tile has a powered barrier who color does
  //  not match the current tile's movable entity
  if (
    nextTile.staticEntity.entityId === ENTITIES.BARRIER.id &&
    nextTile.staticEntity.powered &&
    nextTile.staticEntity.color !== currentTile.movableEntity.color
  ) {
    return false;
  }

  return true;
};

/**
 * Returns "true" if the given movable entities can match with one another
 * @param {Object} entity1 - The first movable entity to compare
 * @param {Object} entity2 - The second movable entity to compare
 * @returns {Boolean} "true" is the given entities match and "false" otherwise
 */
const entitiesMatch = (entity1, entity2) =>
  (ENTITIES[entity1.entityId].matchable && entity2.entityId === ENTITIES.RAINBOW_BLOCK.id) ||
  (entity1.entityId === ENTITIES.RAINBOW_BLOCK.id && ENTITIES[entity2.entityId].matchable) ||
  (entity1.entityId === ENTITIES.BLOCK.id && entity2.entityId === ENTITIES.RAINBOW_BLOCK.id) ||
  (entity1.entityId === ENTITIES.BLOCK.id &&
    entity2.entityId === ENTITIES.BLOCK.id &&
    entity1.color === entity2.color);

/**
 * Removes any fading entities from the given game state
 * @param {Array} gameState - The current game state
 * @returns {Array} The updated game state with the fading entities removed
 */
const removeFadingEntities = gameState => {
  const newGameState = JSON.parse(JSON.stringify(gameState));
  let fading = false;
  let i;
  let j;

  //  If any entities are fading then remove them
  for (i = 0; i < newGameState.length; i++) {
    for (j = 0; j < newGameState[i].length; j++) {
      //  Remove fading movable entities entirely
      if (newGameState[i][j].movableEntity && newGameState[i][j].movableEntity.fading) {
        newGameState[i][j].movableEntity = null;
        fading = true;
      }

      //  Remove shrinking movable entities entirely
      if (newGameState[i][j].movableEntity && newGameState[i][j].movableEntity.shrinking) {
        newGameState[i][j].movableEntity = null;
        fading = true;
      }

      //  Replace shrinking black holes with floors
      if (
        newGameState[i][j].staticEntity &&
        newGameState[i][j].staticEntity.entityId === ENTITIES.BLACK_HOLE.id &&
        newGameState[i][j].staticEntity.shrinking
      ) {
        newGameState[i][j].staticEntity.entityId = ENTITIES.FLOOR.id;
        delete newGameState[i][j].staticEntity.shrinking;
        fading = true;
      }
    }
  }

  return {
    fading,
    gameState: newGameState,
  };
};

/**
 * Fade any matching entities in the given game state
 * @param {Array} gameState - The game state to check
 * @returns {Object} The new game state and whether or not any entities are matching
 */
const fadeEntities = gameState => {
  const newGameState = JSON.parse(JSON.stringify(gameState));
  let i;
  let j;
  let currentMovableEntity;
  let surroundingMovableEntities;
  let finished = true;

  for (i = 0; i < newGameState.length; i++) {
    for (j = 0; j < newGameState[i].length; j++) {
      //  If the current tile doesn't have a movable entity
      //  that isn't fading then move on to the next
      if (!newGameState[i][j].movableEntity || newGameState[i][j].movableEntity.fading) continue;

      currentMovableEntity = newGameState[i][j].movableEntity;
      surroundingMovableEntities = [];

      //  Push all surrounding movable entities into an array
      if (i > 0 && newGameState[i - 1][j].movableEntity) {
        surroundingMovableEntities.push(newGameState[i - 1][j].movableEntity);
      }
      if (i < newGameState.length - 1 && newGameState[i + 1][j].movableEntity) {
        surroundingMovableEntities.push(newGameState[i + 1][j].movableEntity);
      }
      if (j > 0 && newGameState[i][j - 1].movableEntity) {
        surroundingMovableEntities.push(newGameState[i][j - 1].movableEntity);
      }
      if (j < newGameState[0].length - 1 && newGameState[i][j + 1].movableEntity) {
        surroundingMovableEntities.push(newGameState[i][j + 1].movableEntity);
      }

      //  For each surrounding movable entity, check to see whether it is fading
      for (let k = 0; k < surroundingMovableEntities.length; k++) {
        //  If current entity is a smart bomb and a surrounding entity is matchable...
        if (
          currentMovableEntity.entityId === ENTITIES.SMART_BOMB.id &&
          ENTITIES[surroundingMovableEntities[k].entityId].matchable
        ) {
          currentMovableEntity.fading = true;

          //  If connecting with a rainbow block then fade ALL movable entities
          if (surroundingMovableEntities[k].entityId === ENTITIES.RAINBOW_BLOCK.id) {
            for (let n = 0; n < newGameState.length; n++) {
              for (let m = 0; m < newGameState[n].length; m++) {
                if (
                  newGameState[n][m].movableEntity &&
                  ENTITIES[newGameState[n][m].movableEntity.entityId].matchable
                ) {
                  newGameState[n][m].movableEntity.fading = true;
                }
              }
            }
          } else if (surroundingMovableEntities[k].entityId === ENTITIES.BLOCK.id) {
            //  Otherwise, we're connecting with a block, so fade all blocks
            //  in the game area with the same colour
            for (let n = 0; n < newGameState.length; n++) {
              for (let m = 0; m < newGameState[n].length; m++) {
                if (
                  newGameState[n][m].movableEntity &&
                  newGameState[n][m].movableEntity.entityId === ENTITIES.BLOCK.id &&
                  newGameState[n][m].movableEntity.color === surroundingMovableEntities[k].color
                ) {
                  newGameState[n][m].movableEntity.fading = true;
                }
              }
            }
          }

          finished = false;
        } else if (entitiesMatch(currentMovableEntity, surroundingMovableEntities[k])) {
          currentMovableEntity.fading = true;
          surroundingMovableEntities[k].fading = true;
          finished = false;
        }
      }
    }
  }

  return {
    finished,
    newGameState,
  };
};

/**
 * Returns an array of the tiles to process in the correct order depending on
 * the direction of gravity
 * @param {Array} gameState - The current game state
 * @param {String} direction - The current direction of gravity
 * @returns {Array} An order array of tiles to process
 */
const getTilesToProcess = (gameState, direction) => {
  const tilesToProcess = [];
  let i;
  let j;

  switch (direction) {
    case MOVE_UP: {
      for (i = 1; i < gameState.length; i++) {
        for (j = 0; j < gameState[i].length; j++) {
          tilesToProcess.push({
            currentTile: gameState[i][j],
            nextTile: gameState[i - 1][j],
          });
        }
      }
      break;
    }
    case MOVE_RIGHT: {
      for (i = 0; i < gameState.length; i++) {
        for (j = gameState[i].length - 2; j >= 0; j--) {
          tilesToProcess.push({
            currentTile: gameState[i][j],
            nextTile: gameState[i][j + 1],
          });
        }
      }
      break;
    }
    case MOVE_LEFT: {
      for (i = 0; i < gameState.length; i++) {
        for (j = 1; j < gameState[i].length; j++) {
          tilesToProcess.push({
            currentTile: gameState[i][j],
            nextTile: gameState[i][j - 1],
          });
        }
      }
      break;
    }
    case MOVE_DOWN: {
      for (i = gameState.length - 2; i >= 0; i--) {
        for (j = 0; j < gameState[i].length; j++) {
          tilesToProcess.push({
            currentTile: gameState[i][j],
            nextTile: gameState[i + 1][j],
          });
        }
      }
      break;
    }
    default:
  }

  return tilesToProcess;
};

/**
 * Modifies the game state so that crates are able to move again
 * @param {Array} gameState - The current game state
 * @returns {Object} The updated game state
 */
const unstickCrates = gameState => {
  const newGameState = JSON.parse(JSON.stringify(gameState));
  let finished = true;

  for (let i = 0; i < newGameState.length; i++) {
    for (let j = 0; j < newGameState[i].length; j++) {
      if (
        newGameState[i][j].movableEntity &&
        newGameState[i][j].movableEntity.entityId === ENTITIES.CRATE.id &&
        newGameState[i][j].movableEntity.moved
      ) {
        delete newGameState[i][j].movableEntity.moved;
        finished = false;
      }
    }
  }

  return {
    newGameState,
    finished,
  };
};

/**
 * Returns the next game state based on the current direction of gravity
 * @param {Array} gameState - The current game state
 * @param {String} direction - The direction of gravity to move the entities in
 * @returns {Array} The updated game state
 */
const calulateNextGameState = (gameState, direction) => {
  let newGameState = JSON.parse(JSON.stringify(gameState));
  let finished = true;
  let i;
  let currentTile;
  let nextTile;
  let newDirection = direction;

  const removeFadingEntitiesResult = removeFadingEntities(gameState);
  newGameState = removeFadingEntitiesResult.gameState;

  //  If we have fading entities then don't move anything
  if (removeFadingEntitiesResult.fading) {
    return {
      direction: newDirection,
      gameState: newGameState,
    };
  }

  //  Populate an array of tiles to process in the correct order depending on gravity direction
  const tilesToProcess = getTilesToProcess(newGameState, direction);

  //  Go through each of the game state's tiles in order....
  for (i = 0; i < tilesToProcess.length; i++) {
    ({ currentTile, nextTile } = tilesToProcess[i]);

    //  Check for gravity changer entities
    if (
      currentTile.movableEntity &&
      !currentTile.movableEntity.stuck &&
      nextTile.staticEntity &&
      nextTile.staticEntity.entityId === ENTITIES.GRAVITY_CHANGER.id &&
      direction !== nextTile.staticEntity.direction
    ) {
      newDirection = nextTile.staticEntity.direction;
    }

    //  Shrink any entities hitting a black hole or lava
    if (
      currentTile.movableEntity &&
      !currentTile.movableEntity.stuck &&
      nextTile.staticEntity &&
      (nextTile.staticEntity.entityId === ENTITIES.BLACK_HOLE.id ||
        nextTile.staticEntity.entityId === ENTITIES.LAVA.id)
    ) {
      currentTile.movableEntity.shrinking = true;
      nextTile.staticEntity.shrinking = nextTile.staticEntity.entityId === ENTITIES.BLACK_HOLE.id;
    }

    //  Change any matchable entities coming into contact with a color changer
    if (
      currentTile.movableEntity &&
      !nextTile.movableEntity &&
      ENTITIES[currentTile.movableEntity.entityId].matchable &&
      nextTile.staticEntity &&
      nextTile.staticEntity.entityId === ENTITIES.COLOR_CHANGER.id
    ) {
      currentTile.movableEntity = Object.assign(
        currentTile.movableEntity,
        nextTile.staticEntity.targetEntity,
      );
    }

    //  Move any movable entities that are able to move
    if (movableEntityCanMove(currentTile, nextTile)) {
      nextTile.movableEntity = currentTile.movableEntity;
      currentTile.movableEntity = null;
      finished = false;

      if (nextTile.movableEntity.entityId === ENTITIES.CRATE.id) {
        nextTile.movableEntity.moved = true;
      }
    }

    //  Stick any movable entities that land on a sticky spot
    if (
      nextTile.movableEntity &&
      nextTile.staticEntity &&
      nextTile.staticEntity.entityId === ENTITIES.STICKY_SPOT.id
    ) {
      nextTile.movableEntity.stuck = true;
    }
  }

  //  If finished moving then determine whether we should fade any blocks
  if (finished) {
    const fadeEntitiesResult = fadeEntities(newGameState);
    ({ finished, newGameState } = fadeEntitiesResult);
  }

  //  No more moves to calculate if entities stopped moving and no fading to do
  return {
    direction: newDirection,
    gameState: finished ? false : newGameState,
  };
};

/**
 * Changes the direction of gravity
 * @param {Array} gameState - The current game state
 * @param {String} direction - The direction new direction of gravity to move the entities in
 * @returns {Array[]} An array of all of the game states until entities can no longer move
 */
const changeGravityDirection = (gameState, direction) => {
  const moveGameStates = [];
  let nextGameState;
  let currentGameState = gameState;
  let currentDirection = direction;

  do {
    nextGameState = calulateNextGameState(currentGameState, currentDirection);
    currentDirection = nextGameState.direction;

    if (nextGameState.gameState) {
      currentGameState = nextGameState.gameState;
      moveGameStates.push(currentGameState);
    }
  } while (nextGameState.gameState && moveGameStates.length < MAX_GAME_STATES);

  if (!moveGameStates.length) {
    moveGameStates.push(gameState);
  }

  //  Unstick any crates
  const unstickCratesResult = unstickCrates(moveGameStates[moveGameStates.length - 1]);
  if (!unstickCratesResult.finished) {
    moveGameStates.push(unstickCratesResult.newGameState);
  }

  return moveGameStates;
};

/**
 * Returns "true" if any of the entities in the given game are fading
 * @param {Array} gameState - The current game state
 * @returns {Boolean} Whether or not any of the entities within the given game state are fading
 */
const entitiesAreFading = gameState => {
  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState[i].length; j++) {
      if (gameState[i][j].movableEntity && gameState[i][j].movableEntity.fading) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Processes the given state with no gravity direction
 * @param {Array} gameState - The initial game state
 * @returns {Array[]} An array of the initial steps when beginning with the given game state
 */
const getInitialGameState = gameState => changeGravityDirection(gameState, MOVE_NONE);

/**
 * Returns "true" if the level is complete
 * @param {Array} gameState - The current game state
 * @returns {Boolean} Whether or not the level is complete (i.e. no matchable blocks)
 */
const levelIsComplete = gameState => {
  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState[i].length; j++) {
      if (
        gameState[i][j].movableEntity &&
        ENTITIES[gameState[i][j].movableEntity.entityId].matchable
      ) {
        return false;
      }
    }
  }

  return true;
};

/**
 * Make the given moves against the given game state
 * @param {Array} initialGameState - The current game state
 * @param {String[]} directions - The directions to move gravity in
 * @returns {Array[]} An array of all of the game states as a result of performing the given moves
 */
const makeMoves = (initialGameState, directions) => {
  const gameStates = [];
  let gameState = initialGameState;
  let currentMove;

  directions.forEach(direction => {
    currentMove = changeGravityDirection(gameState, direction);

    gameState = currentMove[currentMove.length - 1];
    gameStates.push(currentMove);
  });

  return gameStates;
};

module.exports = {
  ENTITIES,
  MAX_GAME_STATES,
  MOVE_NONE,
  MOVE_UP,
  MOVE_RIGHT,
  MOVE_DOWN,
  MOVE_LEFT,
  calulateNextGameState,
  removeFadingEntities,
  changeGravityDirection,
  entitiesAreFading,
  entitiesMatch,
  getInitialGameState,
  levelIsComplete,
  makeMoves,
  movableEntityCanMove,
  getTilesToProcess,
  unstickCrates,
  fadeEntities,
};
