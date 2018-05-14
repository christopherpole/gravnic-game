const MOVE_UP = 'MOVE_UP';
const MOVE_RIGHT = 'MOVE_RIGHT';
const MOVE_DOWN = 'MOVE_DOWN';
const MOVE_LEFT = 'MOVE_LEFT';

const ENTITIES = {
  NONE: 'ENTITY_NONE',
  FLOOR: 'ENTITY_FLOOR',
  BLOCK: 'ENTITY_BLOCK',
};

/**
 * Returns the next game state based on the current direction of gravity
 * @param {Array} gameState - The current game state
 * @param {String} direction - The direction of gravity to move the entities in
 * @returns {Array} The updated game state
 */
const calulateNextGameState = (gameState, direction) => {
  const newGameState = JSON.parse(JSON.stringify(gameState));
  let finished = true;
  let i;
  let j;

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

  //  No more moves to calculate if entities stopped moving
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

module.exports = {
  ENTITIES,
  MOVE_UP,
  MOVE_RIGHT,
  MOVE_DOWN,
  MOVE_LEFT,
  calulateNextGameState,
  changeGravityDirection,
};
