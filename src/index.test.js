import {
  MOVE_UP,
  MOVE_RIGHT,
  MOVE_DOWN,
  MOVE_LEFT,
  convertTilesToGameState,
  calulateNextGameState,
  changeGravityDirection,
} from './index';
import Entity from './entity';

const testTiles = [
  {
    position: 1,
    selectedTileId: Entity.NONE,
  },
  {
    position: 2,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 3,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 4,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 5,
    selectedTileId: Entity.NONE,
  },
  {
    position: 6,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 7,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 8,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 9,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 10,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 11,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 12,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 13,
    selectedTileId: Entity.BLOCK,
  },
  {
    position: 14,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 15,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 16,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 17,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 18,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 19,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 20,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 21,
    selectedTileId: Entity.NONE,
  },
  {
    position: 22,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 23,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 24,
    selectedTileId: Entity.FLOOR,
  },
  {
    position: 25,
    selectedTileId: Entity.NONE,
  },
];

describe('Gravnic', () => {
  describe('convertTilesToGameState()', () => {
    it('Converts the tiles into a starting game state', () => {
      const gameState = convertTilesToGameState(testTiles);

      expect(gameState).toMatchSnapshot();
    });
  });

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
