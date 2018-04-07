class Gravnic {
  /**
   * Create a Gravnic game
   * @param {Array} tiles - A 2D array of tiles to populate the game state from
   * @returns {Array} A 2D array that represents the current game state
   * @constructor
   */
  loadTiles(tiles) {
    const gameState = [];
    const gridSize = Math.sqrt(tiles.length);
    let gridRow;

    for (let i = 0; i < gridSize; i++) {
      gridRow = [];

      for (let j = 0; j < gridSize; j++) {
        gridRow.push(tiles[i * gridSize + j].selectedTileId);
      }

      gameState.push(gridRow);
    }

    this.gameState = gameState;

    return this.gameState;
  }

  /**
   * Returns the current game state
   * @returns {Array} A 2D array that represents the current game state
   */
  getGameState() {
    return this.gameState;
  }
}

module.exports = Gravnic;

Gravnic.MOVE_UP = 'MOVE_UP';
Gravnic.MOVE_RIGHT = 'MOVE_RIGHT';
Gravnic.MOVE_UDOWN = 'MOVE_DOWN';
Gravnic.MOVE_ULEFT = 'MOVE_LEFT';
