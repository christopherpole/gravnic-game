const MOVE_NONE = 'MOVE_NONE';
const MOVE_UP = 'MOVE_UP';
const MOVE_RIGHT = 'MOVE_RIGHT';
const MOVE_DOWN = 'MOVE_DOWN';
const MOVE_LEFT = 'MOVE_LEFT';

const ENTITIES = {
  NONE: 'NONE',
  FLOOR: 'FLOOR',
  GLASS: 'GLASS',
  BLOCK: 'BLOCK',
  RAINBOW_BLOCK: 'RAINBOW_BLOCK',
  BLACK_HOLE: 'BLACK_HOLE',
  STICKY_SPOT: 'STICKY_SPOT',
};

const STATIC_ENTITIES = [ENTITIES.FLOOR, ENTITIES.BLACK_HOLE, ENTITIES.STICKY_SPOT];
const MATCHABLE_ENTITIES = [ENTITIES.BLOCK, ENTITIES.RAINBOW_BLOCK];

/**
 * Returns "true" if the given entity ID is matchable
 * @param {String} entityId - The entity ID to test
 * @returns {Boolean} "true" if the given entity ID is matchable and "false" otherwise
 */
const isMatchableEntity = entityId => MATCHABLE_ENTITIES.includes(entityId);

/**
 * Returns "true" if the given entity ID is a static entity
 * @param {String} entityId - The entity ID to test
 * @returns {Boolean} "true" if the given entity ID is static and "false" otherwise
 */
const isStaticEntity = entityId => STATIC_ENTITIES.includes(entityId);

/**
 * Returns "true" if the given movable entities can match with one another
 * @param {Object} entity1 - The first movable entity to compare
 * @param {Object} entity2 - The second movable entity to compare
 * @returns {Boolean} "true" is the given entities match and "false" otherwise
 */
const entitiesMatch = (entity1, entity2) =>
  (isMatchableEntity(entity1.entityId) && entity2.entityId === ENTITIES.RAINBOW_BLOCK) ||
  (entity1.entityId === ENTITIES.RAINBOW_BLOCK && isMatchableEntity(entity2.entityId)) ||
  (entity1.entityId === ENTITIES.BLOCK && entity2.entityId === ENTITIES.RAINBOW_BLOCK) ||
  (entity1.entityId === ENTITIES.BLOCK &&
    entity2.entityId === ENTITIES.BLOCK &&
    entity1.color === entity2.color);

/**
 * Returns the next game state based on the current direction of gravity
 * @param {Array} gameState - The current game state
 * @param {String} direction - The direction of gravity to move the entities in
 * @returns {Array} The updated game state
 * @TODO - split some of this logic into smaller functions
 */
const calulateNextGameState = (gameState, direction) => {
  const newGameState = JSON.parse(JSON.stringify(gameState));
  let finished = true;
  let fading = false;
  let i;
  let j;
  let currentTile;
  let nextTile;

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

      //  Replace shrinking static entities with floors
      if (newGameState[i][j].staticEntity && newGameState[i][j].staticEntity.shrinking) {
        newGameState[i][j].staticEntity.entityId = ENTITIES.FLOOR;
        delete newGameState[i][j].staticEntity.shrinking;
        fading = true;
      }
    }
  }

  //  If we have fading entities then don't move anything
  if (fading) return newGameState;

  //  Populate an array of tiles to process in the correct order depending on gravity direction
  const tilesToProcess = [];
  switch (direction) {
    case MOVE_UP: {
      for (i = 1; i < newGameState.length; i++) {
        for (j = 0; j < newGameState[i].length; j++) {
          tilesToProcess.push({
            currentTile: newGameState[i][j],
            nextTile: newGameState[i - 1][j],
          });
        }
      }
      break;
    }
    case MOVE_RIGHT: {
      for (i = 0; i < newGameState.length; i++) {
        for (j = newGameState[i].length - 2; j >= 0; j--) {
          tilesToProcess.push({
            currentTile: newGameState[i][j],
            nextTile: newGameState[i][j + 1],
          });
        }
      }
      break;
    }
    case MOVE_LEFT: {
      for (i = 0; i < newGameState.length; i++) {
        for (j = 1; j < newGameState[i].length; j++) {
          tilesToProcess.push({
            currentTile: newGameState[i][j],
            nextTile: newGameState[i][j - 1],
          });
        }
      }
      break;
    }
    case MOVE_DOWN: {
      for (i = newGameState.length - 2; i >= 0; i--) {
        for (j = 0; j < newGameState[i].length; j++) {
          tilesToProcess.push({
            currentTile: newGameState[i][j],
            nextTile: newGameState[i + 1][j],
          });
        }
      }
      break;
    }
    default:
  }

  //  Go through each of the game state's tiles in order....
  for (i = 0; i < tilesToProcess.length; i += 1) {
    ({ currentTile } = tilesToProcess[i]);
    ({ nextTile } = tilesToProcess[i]);

    //  Shrink any entities hitting a black hole
    if (
      currentTile.movableEntity &&
      nextTile.staticEntity &&
      nextTile.staticEntity.entityId === ENTITIES.BLACK_HOLE
    ) {
      currentTile.movableEntity.shrinking = true;
      nextTile.staticEntity.shrinking = true;
    }

    //  Move any movable entities that are able to move
    if (currentTile.movableEntity && !nextTile.movableEntity && nextTile.staticEntity) {
      nextTile.movableEntity = currentTile.movableEntity;
      currentTile.movableEntity = null;
      finished = false;
    }
  }

  //  If finished moving then determine whether we should fade any blocks
  if (finished) {
    for (i = 0; i < newGameState.length; i++) {
      for (j = 0; j < newGameState[i].length; j++) {
        if (
          newGameState[i][j].movableEntity &&
          isMatchableEntity(newGameState[i][j].movableEntity.entityId)
        ) {
          if (
            (i > 0 &&
              newGameState[i - 1][j].movableEntity &&
              entitiesMatch(
                newGameState[i][j].movableEntity,
                newGameState[i - 1][j].movableEntity,
              )) ||
            (i < newGameState.length - 1 &&
              newGameState[i + 1][j].movableEntity &&
              entitiesMatch(
                newGameState[i][j].movableEntity,
                newGameState[i + 1][j].movableEntity,
              )) ||
            (j > 0 &&
              newGameState[i][j - 1].movableEntity &&
              entitiesMatch(
                newGameState[i][j].movableEntity,
                newGameState[i][j - 1].movableEntity,
              )) ||
            (j < newGameState[0].length - 1 &&
              newGameState[i][j + 1].movableEntity &&
              entitiesMatch(newGameState[i][j].movableEntity, newGameState[i][j + 1].movableEntity))
          ) {
            newGameState[i][j].movableEntity.fading = true;
            finished = false;
          }
        }
      }
    }
  }

  //  No more moves to calculate if entities stopped moving and no fading to do
  if (finished) {
    return false;
  }

  return newGameState;
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

  do {
    nextGameState = calulateNextGameState(currentGameState, direction);

    if (nextGameState) {
      currentGameState = nextGameState;
      moveGameStates.push(currentGameState);
    }
  } while (nextGameState);

  if (!moveGameStates.length) {
    moveGameStates.push(gameState);
  }

  return moveGameStates;
};

/**
 * Processes the given state with no gravity direction
 * @param {Array} gameState - The initial game state
 * @returns {Array[]} An array of the initial steps when beginning with the given game state
 */
const getInitialGameState = gameState => changeGravityDirection(gameState, MOVE_NONE);

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
 * Returns "true" if the level is complete
 * @param {Array} gameState - The current game state
 * @returns {Boolean} Whether or not the level is complete (i.e. no matchable blocks)
 */
const levelIsComplete = gameState => {
  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState[i].length; j++) {
      if (
        gameState[i][j].movableEntity &&
        isMatchableEntity(gameState[i][j].movableEntity.entityId)
      ) {
        return false;
      }
    }
  }

  return true;
};

module.exports = {
  ENTITIES,
  MOVE_NONE,
  MOVE_UP,
  MOVE_RIGHT,
  MOVE_DOWN,
  MOVE_LEFT,
  calulateNextGameState,
  getInitialGameState,
  entitiesMatch,
  changeGravityDirection,
  entitiesAreFading,
  levelIsComplete,
  isMatchableEntity,
  isStaticEntity,
  makeMoves,
};
