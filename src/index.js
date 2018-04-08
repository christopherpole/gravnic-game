const Entity = require('./entity');

const MOVE_UP = 'MOVE_UP';
const MOVE_RIGHT = 'MOVE_RIGHT';
const MOVE_DOWN = 'MOVE_DOWN';
const MOVE_LEFT = 'MOVE_LEFT';

/**
 * Create a Gravnic game
 * @param {Array} tiles - A 2D array of tiles to create the game state from
 * @returns {Array} A 2D array that represents the current game state
 */
const convertTilesToGameState = tiles => {
  const gameState = [];
  const gridSize = Math.round(Math.sqrt(tiles.length));
  let gridRow;
  let currentIdCount = 1;

  for (let i = 0; i < gridSize; i++) {
    gridRow = [];

    for (let j = 0; j < gridSize; j++) {
      const entityId = tiles[i * gridSize + j].selectedTileId;
      let staticEntity = null;
      let movableEntity = null;

      if (entityId === Entity.BLOCK) {
        movableEntity = {
          id: currentIdCount++,
          entityId: Entity.BLOCK,
        };
      }

      if (entityId === Entity.FLOOR || entityId === Entity.BLOCK) {
        staticEntity = {
          id: currentIdCount++,
          entityId: Entity.FLOOR,
        };
      }

      gridRow.push({
        staticEntity,
        movableEntity,
      });
    }

    gameState.push(gridRow);
  }

  return gameState;
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
  MOVE_UP,
  MOVE_RIGHT,
  MOVE_DOWN,
  MOVE_LEFT,
  convertTilesToGameState,
  calulateNextGameState,
  changeGravityDirection,
};
