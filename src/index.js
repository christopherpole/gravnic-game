import Entity from './entity';

export const MOVE_UP = 'MOVE_UP';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const MOVE_DOWN = 'MOVE_DOWN';
export const MOVE_LEFT = 'MOVE_LEFT';

/**
 * Create a Gravnic game
 * @param {Array} tiles - A 2D array of tiles to create the game state from
 * @returns {Array} A 2D array that represents the current game state
 */
export const convertTilesToGameState = tiles => {
  const gameState = [];
  const gridSize = Math.round(Math.sqrt(tiles.length));
  let gridRow;

  for (let i = 0; i < gridSize; i++) {
    gridRow = [];

    for (let j = 0; j < gridSize; j++) {
      const entity = {
        id: i * gridSize + j,
        entityId: tiles[i * gridSize + j].selectedTileId,
      };

      gridRow.push(entity);
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
export const calulateNextGameState = (gameState, direction) => {
  const newGameState = gameState.map(gameStateRow => gameStateRow.slice());
  let finished = true;
  let i;
  let j;

  switch (direction) {
    case MOVE_UP: {
      for (i = 1; i < newGameState.length; i++) {
        for (j = 0; j < newGameState[i].length; j++) {
          if (
            newGameState[i][j].entityId === Entity.BLOCK &&
            newGameState[i - 1][j].entityId === Entity.FLOOR
          ) {
            newGameState[i][j].entityId = Entity.FLOOR;
            newGameState[i - 1][j].entityId = Entity.BLOCK;
            finished = false;
          }
        }
      }
      break;
    }
    case MOVE_RIGHT: {
      for (i = 0; i < newGameState.length; i++) {
        for (j = newGameState[i].length - 2; j > 0; j--) {
          if (
            newGameState[i][j].entityId === Entity.BLOCK &&
            newGameState[i][j + 1].entityId === Entity.FLOOR
          ) {
            newGameState[i][j].entityId = Entity.FLOOR;
            newGameState[i][j + 1].entityId = Entity.BLOCK;
            finished = false;
          }
        }
      }
      break;
    }
    case MOVE_LEFT: {
      for (i = 0; i < newGameState.length; i++) {
        for (j = 1; j < newGameState[1].length - 1; j++) {
          if (
            newGameState[i][j].entityId === Entity.BLOCK &&
            newGameState[i][j - 1].entityId === Entity.FLOOR
          ) {
            newGameState[i][j].entityId = Entity.FLOOR;
            newGameState[i][j - 1].entityId = Entity.BLOCK;
            finished = false;
          }
        }
      }
      break;
    }
    case MOVE_DOWN: {
      for (i = newGameState.length - 2; i > 0; i--) {
        for (j = 0; j < newGameState[i].length; j++) {
          if (
            newGameState[i][j].entityId === Entity.BLOCK &&
            newGameState[i + 1][j].entityId === Entity.FLOOR
          ) {
            newGameState[i][j].entityId = Entity.FLOOR;
            newGameState[i + 1][j].entityId = Entity.BLOCK;
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
export const changeGravityDirection = (gameState, direction) => {
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
