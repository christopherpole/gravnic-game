import {
  ENTITIES,
  MOVE_UP,
  MOVE_RIGHT,
  MOVE_DOWN,
  MOVE_LEFT,
  calulateNextGameState,
  changeGravityDirection,
} from './index';

const testTiles = [
  {
    position: 1,
    selectedTileId: ENTITIES.NONE,
  },
  {
    position: 2,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 3,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 4,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 5,
    selectedTileId: ENTITIES.NONE,
  },
  {
    position: 6,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 7,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 8,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 9,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 10,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 11,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 12,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 13,
    selectedTileId: ENTITIES.BLOCK,
  },
  {
    position: 14,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 15,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 16,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 17,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 18,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 19,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 20,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 21,
    selectedTileId: ENTITIES.NONE,
  },
  {
    position: 22,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 23,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 24,
    selectedTileId: ENTITIES.FLOOR,
  },
  {
    position: 25,
    selectedTileId: ENTITIES.NONE,
  },
];

describe('Gravnic', () => {
  describe('calulateNextGameState()', () => {
    it('Should return the next game state when moving entities up', () => {
      const gameState = calulateNextGameState(convertTilesToGameState(testTiles), MOVE_UP);

      expect(gameState).toMatchSnapshot();
    });

    it('Should return the next game state when moving entities right', () => {
      const gameState = calulateNextGameState(convertTilesToGameState(testTiles), MOVE_RIGHT);

      expect(gameState).toMatchSnapshot();
    });

    it('Should return the next game state when moving entities down', () => {
      const gameState = calulateNextGameState(convertTilesToGameState(testTiles), MOVE_DOWN);

      expect(gameState).toMatchSnapshot();
    });

    it('Should return the next game state when moving entities left', () => {
      const gameState = calulateNextGameState(convertTilesToGameState(testTiles), MOVE_LEFT);

      expect(gameState).toMatchSnapshot();
    });

    it('Should return false if the entities cannot move any further', () => {
      let gameState = calulateNextGameState(convertTilesToGameState(testTiles), MOVE_LEFT);
      gameState = calulateNextGameState(gameState, MOVE_LEFT);
      gameState = calulateNextGameState(gameState, MOVE_LEFT);

      expect(gameState).toBe(false);
    });
  });

  describe('changeGravityDirection()', () => {
    it('Should return an array of all game states from the move', () => {
      let gameStates = changeGravityDirection(convertTilesToGameState(testTiles), MOVE_DOWN);
      expect(gameStates).toMatchSnapshot();

      gameStates = changeGravityDirection(gameStates[gameStates.length - 1], MOVE_UP);
      expect(gameStates).toMatchSnapshot();
    });
  });
});
