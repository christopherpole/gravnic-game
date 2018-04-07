import Gravnic from './index';

const testTiles = [
  {
    position: 1,
    selectedTileId: 0,
  },
  {
    position: 2,
    selectedTileId: 2,
  },
  {
    position: 3,
    selectedTileId: 0,
  },
  {
    position: 4,
    selectedTileId: 0,
  },
  {
    position: 5,
    selectedTileId: 0,
  },
  {
    position: 6,
    selectedTileId: 0,
  },
  {
    position: 7,
    selectedTileId: 0,
  },
  {
    position: 8,
    selectedTileId: 3,
  },
  {
    position: 9,
    selectedTileId: 0,
  },
  {
    position: 10,
    selectedTileId: 0,
  },
  {
    position: 11,
    selectedTileId: 0,
  },
  {
    position: 12,
    selectedTileId: 0,
  },
  {
    position: 13,
    selectedTileId: 4,
  },
  {
    position: 14,
    selectedTileId: 0,
  },
  {
    position: 15,
    selectedTileId: 0,
  },
  {
    position: 16,
    selectedTileId: 1,
  },
];

const testGameState = [[0, 2, 0, 0], [0, 0, 0, 3], [0, 0, 0, 0], [4, 0, 0, 1]];

describe('Gravnic', () => {
  describe('The constructor', () => {
    it('Should initalize without exploding', () => {
      const gravnic = new Gravnic();

      expect(gravnic instanceof Gravnic).toBe(true);
    });
  });

  describe('loadTiles()', () => {
    it('Converts the tiles into a starting game state', () => {
      const gravnic = new Gravnic();
      const gameState = gravnic.loadTiles(testTiles);

      expect(gameState).toEqual(testGameState);
    });
  });

  describe('getGameState()', () => {
    it('Should return the current game state', () => {
      const gravnic = new Gravnic();
      gravnic.loadTiles(testTiles);

      expect(gravnic.getGameState()).toEqual(testGameState);
    });
  });
});
