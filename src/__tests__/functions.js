import { MOVE_UP, calulateNextGameState, changeGravityDirection } from '../index';

describe('calulateNextGameState()', () => {
  let gameState = [
    [{ staticEntity: { id: 1, entityId: 'ENTITY_FLOOR' }, movableEntity: null }],
    [{ staticEntity: { id: 2, entityId: 'ENTITY_FLOOR' }, movableEntity: null }],
    [
      {
        staticEntity: { id: 4, entityId: 'ENTITY_FLOOR' },
        movableEntity: { id: 3, entityId: 'ENTITY_BLOCK' },
      },
    ],
  ];

  it('Should return the next game state', () => {
    //  Move 1
    gameState = calulateNextGameState(gameState, MOVE_UP);
    expect(gameState).toMatchSnapshot();

    //  Move 2
    gameState = calulateNextGameState(gameState, MOVE_UP);
    expect(gameState).toMatchSnapshot();
  });

  it('Should return false if the entities cannot move any further', () => {
    gameState = calulateNextGameState(gameState, MOVE_UP);
    expect(gameState).toBe(false);
  });
});

describe('changeGravityDirection()', () => {
  const gameState = [
    [{ staticEntity: { id: 1, entityId: 'ENTITY_FLOOR' }, movableEntity: null }],
    [{ staticEntity: { id: 2, entityId: 'ENTITY_FLOOR' }, movableEntity: null }],
    [
      {
        staticEntity: { id: 4, entityId: 'ENTITY_FLOOR' },
        movableEntity: { id: 3, entityId: 'ENTITY_BLOCK' },
      },
    ],
  ];

  it('Should return an array of all game states from the move', () => {
    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
  });
});
