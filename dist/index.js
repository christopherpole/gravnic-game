'use strict';

var MOVE_NONE = 'MOVE_NONE';
var MOVE_UP = 'MOVE_UP';
var MOVE_RIGHT = 'MOVE_RIGHT';
var MOVE_DOWN = 'MOVE_DOWN';
var MOVE_LEFT = 'MOVE_LEFT';
var MAX_GAME_STATES = 100;

var ENTITIES = {
  NONE: 'NONE',
  FLOOR: 'FLOOR',
  GLASS: 'GLASS',
  BLOCK: 'BLOCK',
  RAINBOW_BLOCK: 'RAINBOW_BLOCK',
  BLACK_HOLE: 'BLACK_HOLE',
  STICKY_SPOT: 'STICKY_SPOT',
  LAVA: 'LAVA',
  SMART_BOMB: 'SMART_BOMB',
  COLOR_CHANGER: 'COLOR_CHANGER',
  GRAVITY_CHANGER: 'GRAVITY_CHANGER',
  BARRIER: 'BARRIER'
};

var STATIC_ENTITIES = [ENTITIES.FLOOR, ENTITIES.BLACK_HOLE, ENTITIES.STICKY_SPOT, ENTITIES.LAVA, ENTITIES.COLOR_CHANGER, ENTITIES.GRAVITY_CHANGER, ENTITIES.BARRIER];
var MATCHABLE_ENTITIES = [ENTITIES.BLOCK, ENTITIES.RAINBOW_BLOCK];

/**
 * Returns "true" if the given entity ID is matchable
 * @param {String} entityId - The entity ID to test
 * @returns {Boolean} "true" if the given entity ID is matchable and "false" otherwise
 */
var isMatchableEntity = function isMatchableEntity(entityId) {
  return MATCHABLE_ENTITIES.includes(entityId);
};

/**
 * Returns "true" if the given entity ID is a static entity
 * @param {String} entityId - The entity ID to test
 * @returns {Boolean} "true" if the given entity ID is static and "false" otherwise
 */
var isStaticEntity = function isStaticEntity(entityId) {
  return STATIC_ENTITIES.includes(entityId);
};

/**
 * Returns "true" if the given movable entities can match with one another
 * @param {Object} entity1 - The first movable entity to compare
 * @param {Object} entity2 - The second movable entity to compare
 * @returns {Boolean} "true" is the given entities match and "false" otherwise
 */
var entitiesMatch = function entitiesMatch(entity1, entity2) {
  return isMatchableEntity(entity1.entityId) && entity2.entityId === ENTITIES.RAINBOW_BLOCK || entity1.entityId === ENTITIES.RAINBOW_BLOCK && isMatchableEntity(entity2.entityId) || entity1.entityId === ENTITIES.BLOCK && entity2.entityId === ENTITIES.RAINBOW_BLOCK || entity1.entityId === ENTITIES.BLOCK && entity2.entityId === ENTITIES.BLOCK && entity1.color === entity2.color;
};

/**
 * Returns "true" if there is a movable entity on the first given tile that can move to the
 * second given tile
 * @param {Object} currentTile - The current tile
 * @param {Object} nextTile - The tile to move to
 * @returns {Boolean} "true" if current tile has a movable entity that can move onto the target tile
 */
var movableEntityCanMove = function movableEntityCanMove(currentTile, nextTile) {
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

  //  If the current tile's movable entity if stuck then return "false"
  if (currentTile.movableEntity.stuck) {
    return false;
  }

  //  Return "false" if the next tile has a powered barrier who color does
  //  not match the current tile's movable entity
  if (nextTile.staticEntity.entityId === ENTITIES.BARRIER && nextTile.staticEntity.powered && nextTile.staticEntity.color !== currentTile.movableEntity.color) {
    return false;
  }

  return true;
};

/**
 * Returns the next game state based on the current direction of gravity
 * @param {Array} gameState - The current game state
 * @param {String} direction - The direction of gravity to move the entities in
 * @returns {Array} The updated game state
 * @TODO - split some of this logic into smaller functions
 */
var calulateNextGameState = function calulateNextGameState(gameState, direction) {
  var newGameState = JSON.parse(JSON.stringify(gameState));
  var finished = true;
  var fading = false;
  var i = void 0;
  var j = void 0;
  var currentTile = void 0;
  var nextTile = void 0;
  var currentMovableEntity = void 0;
  var surroundingMovableEntities = void 0;
  var newDirection = direction;

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
      if (newGameState[i][j].staticEntity && newGameState[i][j].staticEntity.entityId === ENTITIES.BLACK_HOLE && newGameState[i][j].staticEntity.shrinking) {
        newGameState[i][j].staticEntity.entityId = ENTITIES.FLOOR;
        delete newGameState[i][j].staticEntity.shrinking;
        fading = true;
      }
    }
  }

  //  If we have fading entities then don't move anything
  if (fading) {
    return {
      direction: newDirection,
      gameState: newGameState
    };
  }

  //  Populate an array of tiles to process in the correct order depending on gravity direction
  var tilesToProcess = [];
  switch (direction) {
    case MOVE_UP:
      {
        for (i = 1; i < newGameState.length; i++) {
          for (j = 0; j < newGameState[i].length; j++) {
            tilesToProcess.push({
              currentTile: newGameState[i][j],
              nextTile: newGameState[i - 1][j]
            });
          }
        }
        break;
      }
    case MOVE_RIGHT:
      {
        for (i = 0; i < newGameState.length; i++) {
          for (j = newGameState[i].length - 2; j >= 0; j--) {
            tilesToProcess.push({
              currentTile: newGameState[i][j],
              nextTile: newGameState[i][j + 1]
            });
          }
        }
        break;
      }
    case MOVE_LEFT:
      {
        for (i = 0; i < newGameState.length; i++) {
          for (j = 1; j < newGameState[i].length; j++) {
            tilesToProcess.push({
              currentTile: newGameState[i][j],
              nextTile: newGameState[i][j - 1]
            });
          }
        }
        break;
      }
    case MOVE_DOWN:
      {
        for (i = newGameState.length - 2; i >= 0; i--) {
          for (j = 0; j < newGameState[i].length; j++) {
            tilesToProcess.push({
              currentTile: newGameState[i][j],
              nextTile: newGameState[i + 1][j]
            });
          }
        }
        break;
      }
    default:
  }

  //  Go through each of the game state's tiles in order....
  for (i = 0; i < tilesToProcess.length; i++) {

    //  Check for gravity changer entities
    var _tilesToProcess$i = tilesToProcess[i];
    currentTile = _tilesToProcess$i.currentTile;
    nextTile = _tilesToProcess$i.nextTile;
    if (currentTile.movableEntity && !currentTile.movableEntity.stuck && nextTile.staticEntity && nextTile.staticEntity.entityId === ENTITIES.GRAVITY_CHANGER && direction !== nextTile.staticEntity.direction) {
      newDirection = nextTile.staticEntity.direction;
    }

    //  Shrink any entities hitting a black hole or lava
    if (currentTile.movableEntity && !currentTile.movableEntity.stuck && nextTile.staticEntity && (nextTile.staticEntity.entityId === ENTITIES.BLACK_HOLE || nextTile.staticEntity.entityId === ENTITIES.LAVA)) {
      currentTile.movableEntity.shrinking = true;
      nextTile.staticEntity.shrinking = nextTile.staticEntity.entityId === ENTITIES.BLACK_HOLE;
    }

    //  Change any matchable entities coming into contact with a color changer
    if (currentTile.movableEntity && !nextTile.movableEntity && isMatchableEntity(currentTile.movableEntity.entityId) && nextTile.staticEntity && nextTile.staticEntity.entityId === ENTITIES.COLOR_CHANGER) {
      currentTile.movableEntity = Object.assign(currentTile.movableEntity, nextTile.staticEntity.targetEntity);
    }

    //  Move any movable entities that are able to move
    if (movableEntityCanMove(currentTile, nextTile)) {
      nextTile.movableEntity = currentTile.movableEntity;
      currentTile.movableEntity = null;
      finished = false;
    }

    //  Stick any movable entities that land on a sticky spot
    if (nextTile.movableEntity && nextTile.staticEntity && nextTile.staticEntity.entityId === ENTITIES.STICKY_SPOT) {
      nextTile.movableEntity.stuck = true;
    }
  }

  //  If finished moving then determine whether we should fade any blocks
  if (finished) {
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
        for (var k = 0; k < surroundingMovableEntities.length; k++) {
          //  If current entity is a smart bomb and a surrounding entity is matchable...
          if (currentMovableEntity.entityId === ENTITIES.SMART_BOMB && isMatchableEntity(surroundingMovableEntities[k].entityId)) {
            currentMovableEntity.fading = true;

            //  If connecting with a rainbow block then fade ALL movable entities
            if (surroundingMovableEntities[k].entityId === ENTITIES.RAINBOW_BLOCK) {
              for (var n = 0; n < newGameState.length; n++) {
                for (var m = 0; m < newGameState[n].length; m++) {
                  if (newGameState[n][m].movableEntity && isMatchableEntity(newGameState[n][m].movableEntity.entityId)) {
                    newGameState[n][m].movableEntity.fading = true;
                  }
                }
              }
            } else if (surroundingMovableEntities[k].entityId === ENTITIES.BLOCK) {
              //  Otherwise, we're connecting with a block, so fade all blocks
              //  in the game area with the same colour
              for (var _n = 0; _n < newGameState.length; _n++) {
                for (var _m = 0; _m < newGameState[_n].length; _m++) {
                  if (newGameState[_n][_m].movableEntity && newGameState[_n][_m].movableEntity.entityId === ENTITIES.BLOCK && newGameState[_n][_m].movableEntity.color === surroundingMovableEntities[k].color) {
                    newGameState[_n][_m].movableEntity.fading = true;
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
  }

  //  No more moves to calculate if entities stopped moving and no fading to do
  return {
    direction: newDirection,
    gameState: finished ? false : newGameState
  };
};

/**
 * Changes the direction of gravity
 * @param {Array} gameState - The current game state
 * @param {String} direction - The direction new direction of gravity to move the entities in
 * @returns {Array[]} An array of all of the game states until entities can no longer move
 */
var changeGravityDirection = function changeGravityDirection(gameState, direction) {
  var moveGameStates = [];
  var nextGameState = void 0;
  var currentGameState = gameState;
  var currentDirection = direction;

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

  return moveGameStates;
};

/**
 * Processes the given state with no gravity direction
 * @param {Array} gameState - The initial game state
 * @returns {Array[]} An array of the initial steps when beginning with the given game state
 */
var getInitialGameState = function getInitialGameState(gameState) {
  return changeGravityDirection(gameState, MOVE_NONE);
};

/**
 * Make the given moves against the given game state
 * @param {Array} initialGameState - The current game state
 * @param {String[]} directions - The directions to move gravity in
 * @returns {Array[]} An array of all of the game states as a result of performing the given moves
 */
var makeMoves = function makeMoves(initialGameState, directions) {
  var gameStates = [];
  var gameState = initialGameState;
  var currentMove = void 0;

  directions.forEach(function (direction) {
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
var entitiesAreFading = function entitiesAreFading(gameState) {
  for (var i = 0; i < gameState.length; i++) {
    for (var j = 0; j < gameState[i].length; j++) {
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
var levelIsComplete = function levelIsComplete(gameState) {
  for (var i = 0; i < gameState.length; i++) {
    for (var j = 0; j < gameState[i].length; j++) {
      if (gameState[i][j].movableEntity && isMatchableEntity(gameState[i][j].movableEntity.entityId)) {
        return false;
      }
    }
  }

  return true;
};

module.exports = {
  ENTITIES: ENTITIES,
  MAX_GAME_STATES: MAX_GAME_STATES,
  MOVE_NONE: MOVE_NONE,
  MOVE_UP: MOVE_UP,
  MOVE_RIGHT: MOVE_RIGHT,
  MOVE_DOWN: MOVE_DOWN,
  MOVE_LEFT: MOVE_LEFT,
  calulateNextGameState: calulateNextGameState,
  getInitialGameState: getInitialGameState,
  entitiesMatch: entitiesMatch,
  changeGravityDirection: changeGravityDirection,
  entitiesAreFading: entitiesAreFading,
  levelIsComplete: levelIsComplete,
  isMatchableEntity: isMatchableEntity,
  isStaticEntity: isStaticEntity,
  makeMoves: makeMoves,
  movableEntityCanMove: movableEntityCanMove
};