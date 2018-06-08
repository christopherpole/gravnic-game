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
};

const MATCHABLE_ENTITIES = [ENTITIES.BLOCK, ENTITIES.RAINBOW_BLOCK];

/**
 * Returns "true" if the given entity ID is matchable
 * @param {String} entityId - The entity ID to test
 * @returns {Boolean} "true" if the given entity ID is matchable and "false" otherwise
 */
const isMatchableEntity = entityId => MATCHABLE_ENTITIES.includes(entityId);

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

  //  If any entities are fading then remove them
  for (i = 0; i < newGameState.length; i++) {
    for (j = 0; j < newGameState[i].length; j++) {
      if (newGameState[i][j].movableEntity && newGameState[i][j].movableEntity.fading) {
        newGameState[i][j].movableEntity = null;
        fading = true;
      }
    }
  }

  //  If we have fading entities then don't move anything
  if (fading) return newGameState;

  //  Check if any entities can move
  switch (direction) {
    case MOVE_UP: {
      for (i = 1; i < newGameState.length; i++) {
        for (j = 0; j < newGameState[i].length; j++) {
          if (
            newGameState[i][j].movableEntity &&
            !newGameState[i - 1][j].movableEntity &&
            newGameState[i - 1][j].staticEntity
          ) {
            newGameState[i - 1][j].movableEntity = newGameState[i][j].movableEntity;
            newGameState[i][j].movableEntity = null;
            finished = false;
          }
        }
      }
      break;
    }
    case MOVE_RIGHT: {
      for (i = 0; i < newGameState.length; i++) {
        for (j = newGameState[i].length - 2; j >= 0; j--) {
          if (
            newGameState[i][j].movableEntity &&
            !newGameState[i][j + 1].movableEntity &&
            newGameState[i][j + 1].staticEntity
          ) {
            newGameState[i][j + 1].movableEntity = newGameState[i][j].movableEntity;
            newGameState[i][j].movableEntity = null;
            finished = false;
          }
        }
      }
      break;
    }
    case MOVE_LEFT: {
      for (i = 0; i < newGameState.length; i++) {
        for (j = 1; j < newGameState[i].length; j++) {
          if (
            newGameState[i][j].movableEntity &&
            !newGameState[i][j - 1].movableEntity &&
            newGameState[i][j - 1].staticEntity
          ) {
            newGameState[i][j - 1].movableEntity = newGameState[i][j].movableEntity;
            newGameState[i][j].movableEntity = null;
            finished = false;
          }
        }
      }
      break;
    }
    case MOVE_DOWN: {
      for (i = newGameState.length - 2; i >= 0; i--) {
        for (j = 0; j < newGameState[i].length; j++) {
          if (
            newGameState[i][j].movableEntity &&
            !newGameState[i + 1][j].movableEntity &&
            newGameState[i + 1][j].staticEntity
          ) {
            newGameState[i + 1][j].movableEntity = newGameState[i][j].movableEntity;
            newGameState[i][j].movableEntity = null;
            finished = false;
          }
        }
      }
      break;
    }
    default:
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
 * @returns {Array} An array of all of the game states until entities can no longer move
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

  return moveGameStates;
};

/**
 * Make the given moves against the given game state
 * @param {Array} initialGameState - The current game state
 * @param {String[]} directions - The directions to move gravity in
 * @returns {Array} An array of all of the game states as a result of performing the given moves
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
  MOVE_UP,
  MOVE_RIGHT,
  MOVE_DOWN,
  MOVE_LEFT,
  calulateNextGameState,
  entitiesMatch,
  changeGravityDirection,
  entitiesAreFading,
  levelIsComplete,
  isMatchableEntity,
  makeMoves,
};
